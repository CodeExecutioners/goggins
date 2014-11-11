import os
import urllib
import urllib2
import webapp2
import logging
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
	
class ResourcesPage(webapp2.RequestHandler):
	def get(self):
   
		
		#logging.debug('statement')
   
		#get all resources
		resources = models.Resource.getAllResources()
		
        #self.response.write('Hello world!')
		template_values ={'resources':resources}
		template = JINJA_ENVIRONMENT.get_template('templates/resources.html')
		self.response.write(template.render(template_values))
		
	def post(self):
		jsonstring = self.request.body
		self.response.out.write(jsonstring)
		jsonObject = json.loads(jsonstring)
		
	

app = webapp2.WSGIApplication([('/resources', ResourcesPage)],
                              debug=True)