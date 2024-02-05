from models import db, User, Project, Task, Comment, user_project_association
from faker import Faker
from app import app
from random import choice as rc

fake = Faker()

def seed_database():
    with app.app_context():
        print("Starting seed...")
        
        print("Clearing tables...")
        User.query.delete()
        Project.query.delete()
        Task.query.delete()
        Comment.query.delete()
        
        print("Seeding users...")
        
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
            )
            user._password_hash = fake.password()
            db.session.add(user)
            users.append(user)
        db.session.commit()
        
        
        print("Seeding projects...")

        projects = []
        for i in range(10):
            project = Project(
                title=fake.sentence(),
                description=fake.paragraph(),
                start_date=fake.date_this_decade(),
                end_date=fake.date_between(start_date='+1m', end_date='+6m'),
                status=rc(['Not Started', 'In Progress', 'Completed']),
            )
            db.session.add(project)
            db.session.commit()  # Commit the project instance to the database
            projects.append(project)
            # Add the association
            ins = user_project_association.insert().values(user_id=rc(range(1, len(users) +   1)), project_id=project.id)
            db.session.execute(ins)
        db.session.commit()
        
        print("Seeding tasks...")
        
        tasks = []
        for project in projects:
            for i in range(5):
                task = Task(
                    description=fake.sentence(),
                    due_date=fake.date_between(start_date='today', end_date='+2m'),
                    priority=rc(['High', 'Medium', 'Low']),
                    status=rc(['Not Started', 'In Progress', 'Completed']),
                    project_id=project.id,
                    user_id=rc(range(1, len(users) +   1)) # Randomly assign to one of the created users
                )
                db.session.add(task)
                tasks.append(task)
        db.session.commit()
        
        print("Seeding comments...")
        
        comments = []
        for i in range(50):
            comment = Comment(
                text=fake.sentence(),
                user_id=rc(range(1, len(users) +   1)), # Randomly assign to one of the created users
                task_id=rc(range(1, len(tasks) +   1)) # Randomly assign to one of the created tasks
            )
            db.session.add(comment)
            comments.append(comment)
        db.session.commit()

        print("Seeding complete!")

if __name__ == "__main__":
    seed_database()
