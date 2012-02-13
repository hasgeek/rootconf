#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Website server for rootconf.
"""

from flask import Flask
from coaster import configureapp
from os import environ

# First, make an app and config it

app = Flask(__name__, instance_relative_config=True)
configureapp(app, 'ROOTCONF_ENV')

import rootconf.views
if environ.get('ROOTCONF_ENV') == 'prod':
    import rootconf.loghandler

