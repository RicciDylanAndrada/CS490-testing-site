from flask import Flask, request
from autograder import grade_question
import json

app = Flask(__name__)

@app.route("/autograde")
def autograde():
    submission = request.get_json(force=True)

    for question in submission['questions']:
        question['grade'] = grade_question(question)

    return json.dumps(submission)

if(__name__ == "__main__"):
    app.run()
