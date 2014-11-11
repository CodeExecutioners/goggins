import os
import urllib
from google.appengine.api import users
import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
	
class ContactPage(webapp2.RequestHandler):
   def get(self):
		user("gg@gg.com", 2);
		template_values ={}
		template = JINJA_ENVIRONMENT.get_template('templates/contact.html')
		self.response.write(template.render(template_values))
		user = users.get_current_user()


        

app = webapp2.WSGIApplication([('/contact', ContactPage)],
                              debug=True)