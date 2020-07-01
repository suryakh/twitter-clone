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
        latestId = mysql.connection.insert_id()
        print(latestId)
        mysql.connection.commit()
        cursor.execute(
            """select tweets.*,users.uniqueUserName,users.image,users.userName from tweets  left join users on tweets.userId = users.id where tweets.id = %s""",(latestId,)
        )
        latestData = cursor.fetchone()
        latestData["retweeted"] = False
        cursor.close()
        return jsonify({"latestTweet":latestData})
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
        cursor.execute(
            """select likedTweetId from likes where userId = %s""",(userData["id"],)
        )
        likedResults = cursor.fetchall()
        likedTweets = []
        for i in likedResults:
            likedTweets.append(i["likedTweetId"])
        for r in tweets:
            r["retweeted"] = False
            if r['id'] in likedTweets:
                r["liked"] = True
            else:
                r["liked"] = False
            results.append(r)
        cursor.execute(
            """select newtable.*,users.uniqueUserName as retweeteduser,users.image as retweetedUserImage,users.userName as retwetedUserName from (select retweet.id as retweetId,retweet.reTweetUserId,retweet.retweetContent,retweet.reTweetTime as tweetedTime,tweets.content,tweets.postImage,tweets.id,tweets.userId,tweets.likes,tweets.replies,tweets.reTweets,users.userName,users.uniqueUserName,users.image  from retweet left join tweets on retweet.tweetId = tweets.id left join users on tweets.userId = users.id where reTweetUserId = %s) as newtable left join users on users.id = newtable.reTweetUserId where reTweetUserId in (select followersID from followers where userID = %s) or reTweetUserId = %s """,(userData["id"],userData["id"],userData["id"])
        )
        retweets = cursor.fetchall()
        for r in retweets:
            r["retweeted"] = True
            if r['id'] in likedTweets:
                r["liked"] = True
            else:
                r["liked"] = False
            results.append(r)
        results.sort(key=lambda r: r["tweetedTime"],reverse=True)
        return jsonify({"userTweets":results})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    
@tweets.route('/retweet/<id>',methods = ["POST"])
def retweets(id):
    comment = request.json["comment"]
    if comment:
        comment = comment
    else:
        comment = None
    token = request.headers.get('Authorization')
    encoded_Data = token.split(" ")[0]
    try:
        userData = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """insert into retweet (tweetId,retweetContent,reTweetTime,reTweetUserId) values (%s,%s,now(),%s)""",(id,comment,userData['id'])
        )
        latestId = mysql.connection.insert_id()
        cursor.execute(
            """update tweets set retweets = retweets+1 where id = %s""",(id,)
        )
        mysql.connection.commit()
        cursor.execute(
            """select newtable.*,users.uniqueUserName as retweeteduser,users.image as retweetedUserImage,users.userName as retwetedUserName from (select retweet.id as retweetId,retweet.reTweetUserId,retweet.retweetContent,retweet.reTweetTime as tweetedTime,tweets.content,tweets.postImage,tweets.id,tweets.userId,tweets.likes,tweets.replies,tweets.reTweets,users.userName,users.uniqueUserName,users.image  from retweet left join tweets on retweet.tweetId = tweets.id left join users on tweets.userId = users.id) as newtable  left join users on newtable.reTweetUserId = users.id where retweetId = %s""",(latestId,)
        )
        latestRetweet = cursor.fetchone()
        latestRetweet["retweeted"] = True
        print(latestRetweet)
        cursor.close()
        return jsonify({"latestRetweet":latestRetweet})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    

@tweets.route("/likes/<id>",methods=["POST"])
def likes(id):
    token = request.headers.get("Authorization")
    encoded_Data = token.split(" ")[0]
    try:
        userData = jwt.decode(encoded_Data,"users",algorithms=["HS256"])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """insert into likes (userId,likedTweetId) values(%s,%s)""",(userData["id"],id)
        )
        latestId = mysql.connection.insert_id()
        cursor.connection.commit()
        cursor.execute(
            """update tweets set likes = likes+1 where id = %s""",(id,)
        )
        cursor.connection.commit()
        cursor.close()        
        return jsonify({"message":"posted"})
    except:
        return json.dumps({"message": "some error occurs"}), 400
    

# @tweers.route("/deleteTweet/<id>",methods=["DELETE"])
# def deleteTweet(id):
#     token = request.headers.get("Authorization")
#     encoded_Data = token.split(" ")[0]
#     try:
#         userData = jwt.decode(encoded_Data,"users",algorithms=["HS256"])
#         cursor = mysql.connection.cursor()
#         cursor.execute(
            
#         )
        