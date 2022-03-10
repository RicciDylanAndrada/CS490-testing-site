import re    

def grade_question(subq):
    code = subq['answer']
    question = subq['question']
    test_cases = question['test_cases']
    question_graded = {'grade' : question['points'], 'test_cases' : []}

    correct_name = re.search(f"def\s{question['function_name']}\(", code)
    if(correct_name == None):
        question_graded['grade'] -= question['points'] * 0.2
        question_graded['name_correct'] = False

    print(f"grade after namecheck is {question_graded['grade']}")

    code = re.sub("def\s[a-zA-Z0-9]+", f"def {question['function_name']}", code)

    for tcase in test_cases:
        return_space = {}
        exec(f"{code}\n\ntest_output = {question['func_name']}({tcase[0]})", {}, return_space)
        
        correct = False
        if(return_space['test_output'] == eval(tcase[1])):
            correct = True
        else:
            question_graded['grade'] -= (question['points'] / len(test_cases))
        
        question_graded['test_cases'].append({'case' : tcase, 'output' : return_space['test_output'], 'correct_output' : correct})

    if(question_graded['grade'] < 0):
        question_graded['grade'] = 0

    return question_graded
