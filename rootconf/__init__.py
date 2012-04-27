#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Website server for rootconf.
"""

from flask import Flask
from flaskext.assets import Environment, Bundle
from baseframe import baseframe, baseframe_js, baseframe_css
from os import environ
from coaster import configureapp

# First, make an app and config it

app = Flask(__name__, instance_relative_config=True)
configureapp(app, 'ROOTCONF_ENV')

app.register_blueprint(baseframe)
assets = Environment(app)
js = Bundle(baseframe_js, 'js/leaflet.js')
css = Bundle(baseframe_css, 'css/rootconf.css', 'css/monitor.css')
assets.register('js_all', js)
assets.register('css_all', css)

import rootconf.views
if environ.get('ROOTCONF_ENV') == 'prod':
    import rootconf.loghandler
