import sys
import os, os.path
sys.path.insert(0, os.path.dirname(__file__))
os.environ['ROOTCONF_ENV'] = 'production'
from rootconf import app as application
