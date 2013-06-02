#!/usr/bin/env python

from rootconf import app, init_for
init_for('dev')
app.run('0.0.0.0', 6200, debug=True)
