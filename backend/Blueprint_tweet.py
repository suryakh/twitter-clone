from flask import Blueprint
from flask import request,jsonify
from datetime import datetime
from operator import attrgetter
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
        tweets = cursor.fetchall()
        results = []
        for r in tweets:
            r["retweeted"] = False
            results.append(r)
        cursor.execute(
            """select newtable.*,users.uniqueUserName as retweeteduser from (select retweet.id,retweet.reTweetUserId,retweet.retweetContent,retweet.reTweetTime as tweetedTime,tweets.content,tweets.postImage,tweets.userId,tweets.likes,tweets.replies,tweets.retweets,users.userName,users.uniqueUserName,users.image  from retweet left join tweets on retweet.tweetId = tweets.id left join users on tweets.userId = users.id where reTweetUserId = %s) as newtable left join users on users.id = newtable.reTweetUserId where reTweetUserId in (select followersID from followers where userID = %s) or reTweetUserId = %s """,(userData["id"],userData["id"],userData["id"])
        )
        retweets = cursor.fetchall()
        for r in retweets:
            r["retweeted"] = True
            results.append(r)
        results.sort(key=lambda r: r["tweetedTime"],reverse=True)
        return jsonify({"userTweets":results})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    
@tweets.route('/retweet/<id>',methods = ["POST"])
def retweets(id):
    token = request.headers.get('Authorization')
    encoded_Data = token.split(" ")[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """ insert into retweet (reTweetUserId,tweetId,reTweetTime) values(%s,%s,now())""",(userData["id"],id)
        )
        mysql.connection.commit()
        print(id)
        cursor.close()
        return json.dumps({"message":"successfully retweeted"})
    except:
        return json.dumps({"message": "some error occurs"}), 400