#!/usr/bin/env python

from rootconf import app
from os import environ

environ['ROOTCONF_ENV'] = 'dev'

app.run('0.0.0.0', 6500, debug=True)
