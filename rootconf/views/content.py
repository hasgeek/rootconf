from rootconf import app
from flask import render_template, redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('index2012'), code=302)

@app.route('/bangalore2012')
def index2012():
    return render_template('index.html', active=1)
