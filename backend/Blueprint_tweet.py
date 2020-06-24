from flask import Blueprint
from flask import request,jsonify
import os
import json
import base64
import hashlib
import jwt
import random
import string
from Blueprint_auth import randomString
from server import mysql

tweets = Blueprint('tweets',__name__,static_url_path='/static')

@tweets.route("/post",methods=["POST"])
def postTweet():
    tweetsContent = request.form['tweetContent']
    postImage = request.files
    if postImage:
        imagename = request.files['post']
        randomname = randomString()
        destination = "_".join ([randomname,imagename.filename])
        location = "static/posts/"+destination
        imagename.save(location)             
    else:
        destination = None
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        print(tweetsContent)
        cursor.execute(
            """insert into tweets (content,postImage,userId,tweetedTime) values (%s,%s,%s,now())""",(tweetsContent,destination,userData["id"])
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"tweet posted"})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    
@tweets.route('/alltweets',methods=["GET"])
def sendAlltweets():
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """select maintable.*,users.image,users.uniqueUserName,userName from (select * from tweets where userId in (select followersID from followers where userID = %s) or userId = %s) as maintable left join users on users.id = maintable.userId""",(userData["id"],userData["id"])
        )
        result = cursor.fetchall()
        return jsonify({"userTweets":result})
    except:
        return json.dumps({"message": "some error occurs"}), 400