import os
import urllib
import urllib2
import webapp2
import jinja2
import models
import json
from google.appengine.ext import ndb
from datetime import datetime
import sys
import logging

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
	
class AdminLessonsPage(webapp2.RequestHandler):
	def get(self):
			
	
		#models.Lesson.deleteAllLessons()
		dropInlessons = models.Lesson.getAllLessonsByType('Drop')
		groupLessons = models.Lesson.getAllLessonsByType('Group')
		#get lesson by city
		template_values ={'lessons':dropInlessons, 'groupLessons': groupLessons}
		template = JINJA_ENVIRONMENT.get_template('templates/adminLessons.html')
		self.response.write(template.render(template_values))
		
	
	def post(self):
		#shouldn't really do this
		
		#get all the table data
		jsonstring = self.request.body
		self.response.out.write(jsonstring)
		jsonObject = json.loads(jsonstring)
		
		#update or insert
		for lesson in jsonObject:
			#models.Lesson.deleteAllLessons()
			id= lesson['ID']
			logging.debug("ID: " +id)
			type = lesson['Type']
			city = lesson['City']
			date = lesson['Date']
			location = lesson['Location']
			cost = lesson['Cost']
			models.Lesson.updateLessonByID(id, type, city, date, location, cost)
			#models.Lesson.insertLesson(id, city, date, location, cost)
			
		
		
		
class DeleteLessonsHandler(webapp2.RequestHandler):
	
	
	def post(self):
		logging.debug('DeleteLessonsHandler')
		#get all the table data
		jsonstring = self.request.body
		self.response.out.write(jsonstring)
		jsonObject = json.loads(jsonstring)
		logging.debug('JSON DECODED')
		logging.debug(jsonObject[0])
		id = (jsonObject[0])['ID']
		logging.debug("ID: " +id)
		#delete
		#for lesson in jsonObject:
		#	id= lesson[0]
		models.Lesson.deleteLessonByID(id)
			
		
		
	
app = webapp2.WSGIApplication([
			('/adminLessons', AdminLessonsPage),
			('/deleteLessons', DeleteLessonsHandler),
			],debug=True)