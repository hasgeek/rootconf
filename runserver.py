#!/usr/bin/env python

from rootconf import app
from os import environ

environ['ROOTCONF_ENV'] = 'dev'
app.config['ASSETS_DEBUG'] = False
app.run('0.0.0.0', 6200, debug=True)
