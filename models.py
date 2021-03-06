import webapp2
import datetime
import logging
from google.appengine.ext import ndb


class Lesson(ndb.Model):
	"""Models an individual lesson"""
	type = ndb.StringProperty()
	city = ndb.StringProperty()
	datetime = ndb.StringProperty()
	location = ndb.StringProperty()
	cost = ndb.StringProperty()
	
	@classmethod
	def getAllLessons(self):
		try:
			return self.query()
		except:
			logging.error('getAllLessons failed')
	
	@classmethod
	def getAllLessonsByType(self, type):
		#Group, DropIn
		try:
			return self.query(self.type==type)
		except:
			logging.error('getAllLessonsByType failed')
	
	
	
	@classmethod
	def getNLessons(self, n):
		try:
			return self.query().fetch(n)
		except:
			logging.error('getNLesssons failed')
	
	#insert
	@classmethod
	def insertLesson(self, type, city, datetime, location, cost):
			logging.debug('insertLesson start')
			try:
				lesson = self(id = (type+city), type = type, city = city, datetime = datetime, location = location, cost = cost)
				lesson.put()
				logging.debug('insertLesson success')
			except:
				logging.error('insertLesson failed')
		
	
	#insert
	@classmethod
	def updateLessonByID(self, type, city, datetime, location, cost):
			try:
				lesson_key = ndb.Key(self, (type+city))
				logging.debug(lesson_key)
				updated_lesson = lesson_key.get()
				if(updated_lesson != None):
					logging.debug('Updating record')
					updated_lesson.type = type
					updated_lesson.datetime = datetime
					updated_lesson.location = location
					updated_lesson.cost = cost
					updated_lesson.put()
					logging.debug('updateLesson success')
				else:
					logging.debug('Inserting new record')
					self.insertLesson(type, city, datetime, location, cost)
			except:
				logging.error('updateLesson failed')
		
	
		
		
	#delete
	@classmethod
	def deleteAllLessons(self):
		try:
			lesson_keys = self.query().fetch(keys_only=True)
			ndb.delete_multi(lesson_keys)
			logging.debug('deleteAllLessons success')
		except:
			logging.error('deleteAllLessons failed')
		
	
		
	#filtering
	@classmethod
	def getLessonsByCity(self, city):
		logging.debug('getLessonsByCity started')
		try:
			return self.query(self.city == city);
		except:
			logging.error('getLessonsByCity failed')

			
class Resource(ndb.Model):
	type = ndb.StringProperty()
	title = ndb.StringProperty()
	linkOrAddress = ndb.StringProperty()
	desc = ndb.StringProperty()
	
	@classmethod
	def getAllResources(self):
		try:
			return self.query()
		except:
			logging.error('getAllResource failed')
			
	def getAllResourcesByType(self, type):
		try:
			return self.query(self.type==type)
		except:
			logging.error('getAllLessonsByType failed')
	
	@classmethod
	def getNResources(self, n):
		try:
			return self.query().fetch(n)
		except:
			logging.error('getNResource failed')
	
	#insert
	@classmethod
	def insertResource(self, type, title, linkOrAddress, desc):
		try:
			resource = self(id = (type + title), type = type, title = title, linkOrAddress = linkOrAddress, desc = desc)
			resource.put()
			logging.debug('insertResource success')
		except:
			logging.error('insertResource failed')
	

	#insert
	@classmethod
	def updateResourceByID(self, type, title, linkOrAddress, desc):
			try:
				resource_key = ndb.Key(self, (type+title))
				logging.debug(resource_key)
				updated_resource = resource_key.get()
				if(updated_resource != None):
					logging.debug('Updating record')
					updated_resource.type = type
					updated_resource.title = title
					updated_resource.linkOrAddress = linkOrAddress
					updated_resource.desc = desc
					updated_resource.put()
					logging.debug('updateResource success')
				else:
					logging.debug('Inserting new record')
					self.insertResource(type, title, linkOrAddress, desc)
			except:
				logging.error('updateResource failed')	
		
	#delete
	@classmethod
	def deleteAllResources(self):
		try:
			resource_keys = self.query().fetch(keys_only=True)
			ndb.delete_multi(resource_keys)
			logging.debug('deleteAllResources success')
		except:
			logging.error('deleteAllResources failed')
			
			
class Email(ndb.Model):
	"""Models an individual email"""
	firstname = ndb.StringProperty()
	lastname = ndb.StringProperty()
	phone = ndb.StringProperty()
	email = ndb.StringProperty()
	message = ndb.StringProperty()

class Users(ndb.Model):
	"""Models an individual user"""
	username = ndb.StringProperty()
	password = ndb.StringProperty()
	email = ndb.StringProperty()
	
	@classmethod
	def getAllUsers(self):
		try:
			return self.query()
		except:
			logging.error('getAllUsers failed')

	#insert
	@classmethod
	def insertUser(self, username, password, email):
		
		try:
			user = self(username=username, password = password, email=email)
			user.put()
			logging.debug('insertUser success')
		except:
			logging.error('insertUser failed')
		
	#delete
	@classmethod
	def deleteAllUsers(self):
		try:
			user_keys = self.query().fetch(keys_only=True)
			ndb.delete_multi(user_keys)
		except:
			logging.error('deleteAllUsers failed')
	
		
	#filtering
	@classmethod
	def getUserByUsername(self, username):
		try:
			return self.query(self.username == username);
		except:
			logging.error('getUserByUsername failed')
	
	#return true if user is found, false otherwise
	@classmethod
	def loginProcess(self, username, password):
		loginSuccess = False;
		try:
			loginSuccess = (self.query(self.username == username and self.password==password).count()==1)
			logging.debug('loginProcess success:' + loginSucess)
			return loginSuccess
		except:
			logging.error('loginProcess failed')
			return loginSuccess
	