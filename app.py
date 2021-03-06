import datetime
from flask_cors import CORS

import sys

import json
from sqlalchemy import DateTime, null

from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import re


from core import models
from crypt import methods
from venv import create
from flask import Flask,request,jsonify, session
from flask_cors import CORS
import sqlite3 as sql
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager



app = Flask(__name__)
app.config.from_object(Configuration)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=1)

app.config['DEBUG'] = True
app.config.from_object(Configuration)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
cors = CORS(app)


def grade_question(subq):
    code = subq['answer']
    question = subq['question']
    test_cases = question['test_cases']
    restraint = question['restraint']
    question_graded = {'test_cases' : []}
    points = int(subq['points'])


    correct_name = re.search(f"def\s{question['function_name']}\(", code)
    recursed = re.findall(f"def\s{question['function_name']}\(", code)
    
    question_graded['restraint'] = points * 0.2
    question_graded['show_restraint'] = points * 0.2

    question_graded['name_correct'] = points * 0.2
    question_graded['show_name_correct'] = points * 0.2

    
    if(restraint != "none" and (restraint not in code)):
        question_graded['restraint'] = 0.0

        question_graded['show_restraint'] = 0.0


    elif(restraint != "none" and restraint.lower() == 'recursive' and len(recursed) < 2):
        question_graded['restraint'] =0.0
        question_graded['show_restraint'] = 0.0


    if(correct_name == None):
        question_graded['name_correct'] = 0.0
        question_graded['show_name_correct'] = 0.0


    code = re.sub("def\s[a-zA-Z0-9]+", f"def {question['function_name']}", code)

    for tcase in test_cases:
        try:
            return_space = {}
            exec(f"{code}\n\ntest_output = {question['function_name']}({tcase[0]})", {}, return_space)
            grade = 0
            correct = False
            if(return_space['test_output'] == eval(str(tcase[1]))):
                correct = True
                grade = ((points * 0.6) / len(test_cases))
        
            question_graded['test_cases'].append({'case' : tcase, 'output' : return_space['test_output'], 'correct_output' : correct, 'points' : grade,'show_points':grade})

        except:
            question_graded['test_cases'].append({'case' : tcase, 'output' : 'INVALID PYTHON', 'correct_output' : correct, 'points' : 0})

   

    return question_graded





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
    question = db.Column(db.String(256))
class tes_t(db.Model):
    test_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section = db.Column(db.String(80))
    tes_t = db.Column(db.String(256))
class submission(db.Model):
    submission_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(15))
    submission = db.Column(db.String(256))
    section = db.Column(db.String(80))
    show = db.Column(db.String(10), nullable=True)

     

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
    #ls_dict = {"sections": ["008", "007", "006"]}
    #json_string = json.dumps(ls_dict)
    socks = User.query.filter_by(user_id=4).first()
    y = json.loads(socks.section)
    response ={"user":socks.username,"section":y, "user_id":socks.user_id, "status": 0}
    return response
    response_body = {
        
        
        "about" :"Testing for this link"
    }

    


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
    socks1 = User_role.query.filter_by(user_id=socks.user_id).first()
    
    if (ausername != socks.username or password!=socks.password):
        response = {"status": -1 }
    else:
        if (socks1.role_id == 1):
            y = json.loads(socks.section)
            access_token = create_access_token(identity=ausername)
            response ={"access_token":access_token,"user":socks.username,"section": y, "user_id":socks.user_id, "status": 1}

        if (socks1.role_id == 2):
            access_token = create_access_token(identity=ausername)
            response ={"access_token":access_token,"user":socks.username,"section":socks.section, "user_id":socks.user_id, "status": 0}
    #session['id'] = socks.user_id
    return response
        
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/add_question',methods=['POST'])
def add_question():
    question = request.json.get("question", None)
   # resultJSON = json.dumps(question)
    con = sql.connect('database.db')
    c =  con.cursor() 
    c.execute("INSERT INTO questions (question) VALUES ('" + json.dumps(question) + "')")
    con.commit()
    response ={"question":question }

    return response

@app.route('/question',methods=['GET'])
def question():
    #question = request.json.get("username", None)
    #resultJSON = json.dumps(question)
    con = sql.connect('database.db')
    cur = con.cursor()
    query = cur.execute("SELECT question_id,question FROM questions")
    result_list = []
    socks = questions.query.all()
    for sock in socks:
        y = json.loads(sock.question)
        lst = {"question_id": sock.question_id, "question": y } 
        result_list.append(lst) 
    cur.close()
    cur.connection.close()
    response ={"question":result_list }

    return response
   
@app.route('/make_test',methods=['POST'])
def make_test():
        
    section = request.json.get("section", None)
    tes_t = request.json.get("tes_t", None)
    #tes_name = request.json.get("tes_name", None)

    print(tes_t, file=sys.stderr)

    #resultJSON = json.dumps(question)
    con = sql.connect('database.db')
    c =  con.cursor() 
    c.execute("INSERT INTO tes_t (section, tes_t) VALUES ('" + section + "', '" + json.dumps(tes_t) + "')")
    con.commit()
    response ={"good":"good" }
    return response

@app.route('/show_test',methods=['POST'])
def show_test():
    sec = request.json.get("section", None)
    con = sql.connect('database.db')
    cur = con.cursor()
    query = cur.execute("SELECT test_id, tes_t FROM Tes_t where section='"+str(sec)+"'")
    socks = tes_t.query.filter_by(section=sec).all()
    result_list = []
    for sock in socks:
        y = json.loads(sock.tes_t)
        lst = {"test_id": sock.test_id, "tes_t": y } 
        result_list.append(lst) 
    cur.close()
    cur.connection.close()
    response ={"test":result_list }
    return response

@app.route('/submission',methods=['POST'])
def sub():
    submission = request.json.get("submission", None)
    section = request.json.get("section", None)
    u_name = request.json.get("username", None)
    con = sql.connect('database.db')
    c =  con.cursor() 
    c.execute("INSERT OR IGNORE INTO submission (username, submission, section) VALUES ('" + u_name + "','" + json.dumps(submission)+ "', '" + section + "')")
    con.commit()
    response ={"good":"good" }
    return response
@app.route("/autograde",methods=['POST'])
def grade():

    submission = request.json.get('submission')
    print(submission)
    for question in submission[0]['submission'][0]['tes_t']['questions']:
        question['question']['grade'] = grade_question(question)

    return json.dumps(submission)


@app.route('/submission_update',methods=['POST'])
def submission_update():
    content=request.json
    sub_id = content["sub_id"]
    submission = content["submission"]
    con = sql.connect('database.db')
    c =  con.cursor() 
    c.execute("update submission set show='asasa' where submission_id='" + str(sub_id) + "'")
    c.execute("update submission set submission='" + json.dumps(submission) + "' where submission_id='" + str(sub_id) + "'")
    con.commit()
    response ={"good":"good" }
    return response


@app.route('/show_submission_student',methods=['POST'])
def show_submission_student():

    sec = request.json.get("section", None)
    u_name = request.json.get("username", None)
    status = request.json.get("status", None)
    
    if (status == 2):
        con = sql.connect('database.db')
        cur = con.cursor()
        #query = cur.execute("SELECT * FROM submission where user_id='"+str(user_id)+"'")
        socks = submission.query.filter_by(username=u_name).all()
        
        result_list = []
        for sock in socks:
            if(sock.show != None):
                y = json.loads(sock.submission)
                lst = {'submission': y, "sub_id":sock.submission_id }
                result_list.append(lst) 

        cur.close()
        cur.connection.close()
        print(result_list)
        response ={"submissions":result_list }
        return response
    if (status == 1):
        con = sql.connect('database.db')
        cur = con.cursor()
        #query = cur.execute("SELECT * FROM submission where user_id='"+str(user_id)+"'")
        socks = submission.query.filter_by(section=sec).all()
        result_list = []
        for sock in socks:
            y = json.loads(sock.submission)
            lst = {'submission': y, "sub_id":sock.submission_id }
            result_list.append(lst) 
        cur.close()
        cur.connection.close()
        response ={"submissions":result_list }
        return response