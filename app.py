from flask import Flask
from flask import request
from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['DEBUG'] = True
app.config.from_object(Configuration)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////Users/parampatel/cs490/CS490-testing-site/database.db"
db = SQLAlchemy(app)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    password = db.Column(db.String(80)) 

from core import models
from crypt import methods
from venv import create
from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"     

@app.route("/")
def home():
    return "Hello, Flask!"

#this for testing purposes for react
@app.route("/api",methods=["GET"])
def index():
    return {
        "testing":"Hello from flask backend"
    }
@app.route('/login',methods=["GET"])
def my_profile():
    
    response_body = {
        
        "name": "aa",
        "about" :"Testing for this link"
    }

    return response_body
@app.route("/token",methods=["POST"])
def create_token():
    username = request.get_json("username",None)
    password = request.get_json("password",None)

    if (  (username != "admin" or username !="student")  or (password !="admin" or password!="student")):
        return {"msg":"Wrong Credentials"}

    else:
        access_token = create_access_token(identity=username)

        if(username == "admin" and password=="admin"):
            response ={"access_token":access_token,"user":"admin"}
            return response
        elif(username == "student" and password=="student"):
            response ={"access_token":access_token,"user":"student"}
            return response
            
