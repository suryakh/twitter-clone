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

@profileData.route("/user/<id>", methods=["GET"])
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
        cursor.execute(
            """select count(id) as following from followers where userID = %s""",(result["id"],)
        )
        following = cursor.fetchone()
        cursor.execute(
            """select count(id) as follows from followers where followersID = %s""",(result["id"],)
        )
        follows = cursor.fetchone()
        cursor.close()
        result["following"] = following ["following"]
        result["follows"] = follows["follows"]
        return jsonify({"profile":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    
@profileData.route("/unfollowers",methods=["GET"])
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
        cursor.close()
        return jsonify({"usersData":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400

@profileData.route("/follow/<id>",methods=["POST"])
def follow(id):
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """insert into followers (userID,followersID) values (%s,%s)""",(userData["id"],id)
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"now following"})
    except:
        return json.dumps({"message": "some error occurs"}), 400

@profileData.route("/following/<id>",methods=["GET"])
def following(id):
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    print(id)
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """select id from users where uniqueUserName = %s""",(id,)
        )
        userId = cursor.fetchone()
        
        cursor.execute(
            """select id,userName,uniqueUserName,image from users where users.id in (select followersID from followers where userID = %s) and users.id != %s""",(userId["id"],userId["id"])
        )
        result = cursor.fetchall()
        cursor.close()
        return jsonify({"usersData":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    
@profileData.route("/followers/<id>",methods=["GET"])
def followers(id):
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """select id from users where uniqueUserName = %s""",(id,)
        )
        userId = cursor.fetchone()
        print(id)
        cursor.execute(
            """select id,userName,uniqueUserName,image from users where users.id in (select userID from followers where followersID = %s) and users.id != %s""",(userId["id"],userId["id"])
        )
        result = cursor.fetchall()
        cursor.close()
        return jsonify({"usersData":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400