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

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
	
class LessonsPage(webapp2.RequestHandler):
	def get(self):
		
		#delete the values
		models.Lesson.deleteAllLessons()
		
		#get all lessons
		lessons = models.Lesson.getNLessons(3)
		
		#get lesson by city
		
		
		
		
		
		template_values ={'lessons':lessons}
		template = JINJA_ENVIRONMENT.get_template('templates/lessons.html')
		self.response.write(template.render(template_values))
		
	
	def post(self):
		self.response.write(request.ajax)
		self.response.write(request.args)
		#insert
		#self.response.write(data)
		#city = 'Eau Claire'
		#date = datetime.now() 
		#location = 'testlocation'
		#cost = 26.0
		#models.Lesson.insertLesson(city, date, location, cost)
		self.redirect('/lessons')
		

app = webapp2.WSGIApplication([
			('/lessons', LessonsPage),
			],debug=True)