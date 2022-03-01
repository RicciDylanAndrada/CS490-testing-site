<<<<<<< HEAD
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
    socks = User.query.filter_by(username='Param').order_by(User.username).all()
    sock_text = '<ul>'
    for sock in socks:
        sock_text += '<li>' + "username =" + str(sock.id) + ', ' + "password =" +sock.username + '</li>'
    sock_text += '</ul>'
    return sock_text
    #return 'Hello world!'

@app.route('/login',methods=["GET"])
def my_profile():
    
    response_body = {
=======
# from crypt import methods
# from venv import create
# import config from Configuration
# from flask import Flask,request,jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_marshmallow import Marshmallow
# from flask_cors import CORS
# from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
#                                unset_jwt_cookies, jwt_required, JWTManager
# db = SQLAlchemy()

# migrate = Migrate()

# ma = Marshmallow()
# cors = CORS()

# def create_app():
#     app = Flask(__name__)
#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#     app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
#     jwt = JWTManager(app)       

   
#     db.init_app(app)
#     migrate.init_app(app, db)
#     ma.init_app(app)
#     cors.init_app(app)

#     return app
# app = create_app()
# @app.route("/")
# def home():
#     return "Hello, Flask!"

# #this for testing purposes for react
# @app.route("/api",methods=["GET"])
# def index():
#     return {
#         "testing":"Hello from flask backend"
#     }
# @app.route('/profile')
# def my_profile():
#     response_body = {
#         "name": "Ricci",
#         "about" :"Testing for this link"
#     }

#     return response_body
# @app.route("/token",methods=["POST"])
# def create_token():
#     username = request.json.get("username",None)
#     password = request.json.get("password",None)

#     if (  (username != "admin" or username !="student")  or (password !="admin" or password!="student")):
#         return {msg:"Wrong Credentials"}

#     else:
#         access_token = create_access_token(identity=username)

#         if(username == "admin" and password=="admin"):
#             response ={"access_token":access_token,"user":"admin"}
#             return response
#         elif(username == "student" and password=="student"):
#             response ={"access_token":access_token,"user":"student"}
#             return response
            
>>>>>>> 28ac918a5055e7f9eeddad7b46db3fe3709953c5
        
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
            
