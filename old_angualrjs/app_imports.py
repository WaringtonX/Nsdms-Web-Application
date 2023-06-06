from flask import Flask, session, render_template, request, \
    redirect, url_for, g, send_file, Blueprint, jsonify, make_response, Response
from turbo_flask import Turbo
import requests
import datetime
import json
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.secret_key = 'do or do not there is no try : YODA'
turbo = Turbo(app)


@app.route("/logout")
def logout():
    session.clear()
    response = make_response(redirect('/'))
    response.set_cookie('JWT-TOKEN', '')
    return response


@app.errorhandler(404)
def page_not_found(e):
    return redirect('/')