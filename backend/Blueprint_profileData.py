from flask import Blueprint
from flask import request,jsonify
import os
import json
import base64
import hashlib
import jwt
import random
import string
from server import mysql

profileData = Blueprint('profileData',__name__,static_url_path='/static')

@profileData.route("/user/<id>")
def userProfile(id):
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """select * from users where uniqueUserName = %s""",(id,)
        )
        result = cursor.fetchone()
        return jsonify({"profile":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    
@profileData.route("/unfollowers")
def unFollow():
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """select id,userName,uniqueUserName,image from users where users.id not in (select followersID from followers where userID = %s) and users.id != %s""",(userData["id"],userData["id"])
        )
        result = cursor.fetchall()
        return jsonify({"usersData":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400

