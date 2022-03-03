import datetime
from flask_cors import CORS

<<<<<<< HEAD
import sys
=======
import sqlite3
>>>>>>> cc4ee6da3232b2261c382aa6c9034e8287a82312

import json
from sqlalchemy import DateTime

from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate



from core import models
from crypt import methods
from venv import create
from flask import Flask,request,jsonify
from flask_cors import CORS
import sqlite3 as sql
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

cors = CORS()


app = Flask(__name__)
app.config.from_object(Configuration)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=1)

app.config['DEBUG'] = True
app.config.from_object(Configuration)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////Users/parampatel/cs490/CS490-testing-site/database.db"
db = SQLAlchemy(app)
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(15), unique=True)
    password = db.Column(db.String(80)) 
    section = db.Column(db.String(80))
class User_role(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, primary_key=True)

class roles(db.Model):
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(80)) 
class questions(db.Model):
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(120))

     

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route("/")
def home():
    return "Hello, Flask!"

#this for testing purposes for react
@app.route("/api",methods=["GET"])
def index():
    socks = questions.query.all()
    print("this is socks", socks, file=sys.stderr)

    sock_text = '<ul>'
    for sock in socks:
        sock_text += '<li>' + "username =" + str(sock.question_id) + ', ' + "password =" +sock.question + '</li>'
    sock_text += '</ul>'
    return sock_text
    #return 'Hello world!'

@app.route('/login',methods=["GET"])
def my_profile():
    
    response_body = {
        
        "name": "aa",
        "about" :"Testing for this link"
    }

    return response_body


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(datetime.timezone.utc)
        target_timestamp = datetime.timestamp(now + datetime.timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
@app.route("/token",methods=["POST"])

def create_token():
    
    ausername = request.json.get("username", None)
    password = request.json.get("password", None)
    socks = User.query.filter_by(username=ausername).first()
    
    
    if (ausername != socks.username or password!=socks.password):
        return {"msg":"Wrong Credentials"}

    else:
        
        access_token = create_access_token(identity=ausername)

        
        response ={"access_token":access_token,"user":socks.username,"status":"1"}
        return response
        
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/add_question',methods=['POST'])
def add_question():
    question = request.json.get("question", None)
    resultJSON = json.dumps(question)
    con = sql.connect('database.db')
    c =  con.cursor() 
    c.execute("INSERT INTO questions (question) VALUES ('" + resultJSON + "')")
    con.commit()

@app.route('/question',methods=['GET'])
def question():
    #question = request.json.get("username", None)
    #resultJSON = json.dumps(question)
    con = sql.connect('database.db')
    cur = con.cursor()
    query = cur.execute("SELECT * FROM questions")
    colname = [ d[0] for d in query.description ]
    result_list = [ dict(zip(colname, r)) for r in query.fetchall() ]
    cur.close()
    cur.connection.close()
    response ={"question":result_list }
    return response
   
    data1 = cur.fetchall()   
    response = []
    for data in data1:
        row_data = {"question_id" : data.question_id, "question" : data.question}
    response.append(row_data)
    return response
