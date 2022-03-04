<<<<<<< HEAD
from core import db
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    date = db.Column(db.Date())
    time = db.Column(db.Time())
    category= db.Column(db.String, db.ForeignKey('category.id'))

    def __repr__(self):
        return '<ToDo {}>'.format(self.title)
=======
# from core import db
# class Todo(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(140))
#     date = db.Column(db.Date())
#     time = db.Column(db.Time())
#     category= db.Column(db.String, db.ForeignKey('category.id'))

#     def __repr__(self):
#         return '<ToDo {}>'.format(self.title)
>>>>>>> f177a802bd3b34b4cb81fac32dd60cf0ecae3f01
