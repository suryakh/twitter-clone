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


auth = Blueprint("auth",__name__,static_url_path="/static")


@auth.route("/signup" ,methods=["POST"])
def register():
    userName = request.form["userName"]
    email= request.form["email"]
    userBio = request.form["userBio"]
    password = request.form["password"]
    image = request.files
    print(image,"hhhhhh")
    salt = generate_salt().decode('utf-8')
    if image:
        print("hhhh")
        imagename = request.files['image']
        randomname = randomString()
        destination = "_".join ([randomname,imagename.filename])
        location = "static/profiles/"+destination
        imagename.save(location)
    else:
        destination = "default.jpeg"
    password_hash = hasing(password + str(salt))
    num = random.randint(0,99999)
    uniqueUserName = userName+str(num)
    print(uniqueUserName)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO users (username, email, salt, password_hash,userBio,image,joinTime,uniqueUserName)
        VALUES (%s, %s, %s, %s,%s ,%s,CURDATE(),%s)""", (userName, email, salt, password_hash,userBio,destination,uniqueUserName)
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps({"message":"updated"})

@auth.route("/login" ,methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]
    cursor = mysql.connection.cursor()
    cursor.execute(
    """select * from users where email= %s""",(email,)
    )
    results = cursor.fetchone()
    if results != None:
        user = results
        salt = user["salt"]
        password_hash = hasing(password+str(salt))
        if password_hash == user["password_hash"]:
            encode_Data = jwt.encode({"id":user["id"]},'users',algorithm= 'HS256').decode('utf-8')
            return json.dumps({"token":str(encode_Data),"username":user["userName"],"image":user["image"],"uniqueName":user["uniqueUserName"]})
        else:
            return json.dumps({"message":"invalid input"}),400 
    else:
        return json.dumps({"message":"invalid input"}),400      

def generate_salt():
    salt = os.urandom(16)
    return base64.b64encode(salt)

def hasing(string):
    print(string)
    hash= hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def randomString():
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(5))
