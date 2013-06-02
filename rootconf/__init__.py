#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Website server for rootconf.
"""

from flask import Flask
from baseframe import baseframe, assets, Version
import coaster.app

# First, make an app and config it

version = Version('0.1.0')
app = Flask(__name__, instance_relative_config=True)

assets['leaflet.js'][Version('0.3.0')] = 'js/leaflet.js'
assets['leaflet.css'][Version('0.3.0')] = 'css/leaflet.css'
assets['rootconf.css'][version] = 'css/rootconf.css'
assets['rootconf-monitor.css'][version] = 'css/monitor.css'

import rootconf.views


def init_for(env):
    coaster.app.init_app(app, env)
    baseframe.init_app(app, requires=['baseframe', 'rootconf', 'rootconf-monitor'],
        bundle_js=assets.require('leaflet.js'), bundle_css=assets.require('leaflet.css'))
