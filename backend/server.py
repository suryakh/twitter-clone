from flask import Flask
from flask_cors import CORS
from flask import send_file
import json
from flask_mysqldb import MySQL

app = Flask(__name__,static_url_path="/static")
mysql = MySQL(app)
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '$uryA11472'
app.config['MYSQL_DB'] = 'twitterclone'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route("/")
def myroute():
    return "hello"

from Blueprint_auth import auth
from Blueprint_profileData import profileData
from Blueprint_tweet import tweets


app.register_blueprint(auth,url_prefix="/auth")
app.register_blueprint(profileData,url_prefix="/profile")
app.register_blueprint(tweets,url_prefix="/tweet")