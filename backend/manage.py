#The manage.py file allows us to conduct deployment tasks, initialize the database, check for schema changes, and then migrate it to the most recent version.


def deploy():
    """Run deployment tasks."""
    from app import create_app,db
    from flask_migrate import upgrade,migrate,init,stamp
    from models import Articles

    app = create_app()
    app.app_context().push()

    # create database and tables
    db.create_all()

    # migrate database to latest revision
    stamp()
    migrate()
    upgrade()

deploy()