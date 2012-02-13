from rootconf import app
from flask import render_template

@app.route('/')

def index():
    return render_template('index.html', active=1)

@app.route('/about')
def about():
    return render_template('about.html', active=2)
