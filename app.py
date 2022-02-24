from crypt import methods
from venv import create
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
cors = CORS()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

   
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    cors.init_app(app)

    return app
app = create_app()
@app.route("/")
def home():
    return "Hello, Flask!"

#this for testing purposes for react
@app.route("/api",methods=["GET"])
def index():
    return {
        "testing":"Hello from flask backend"
    }
@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Ricci",
        "about" :"Testing for this link"
    }

    return response_body
@app.route("/token",methods=["POST"])
if __name__=="__main__":
    app.run(debug=True)
