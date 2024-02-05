from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

# Local imports

from config import db, bcrypt


# A many-to-many relationship between the User and Project models through the user_project_association table
user_project_association = db.Table('user_project',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    # Relationships
    projects = db.relationship("Project", secondary=user_project_association, back_populates="users")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    comment_texts = association_proxy("comments", "text")
    
    # Serialization rules
    serialize_rules = ("-password_hash", "-projects", "-comments")
    
    # Validation    
    @validates("username")
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise ValueError(f"{key} must be a string.")
        if not username or len(username) < 3: 
            raise ValueError("Username must be longer than 3 characters.")
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            raise ValueError("Username must be unique.")
        return username
    
    @validates("email")
    def validate_email(self, key, email):
        if not isinstance(email, str):
            raise ValueError(f"{key} must be a string.")
        if not email or len(email) < 1: 
            raise ValueError("Email must not be empty.")
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("Email must be unique.")
        return email

    #prevent direct access to the hashed password
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes are private.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")
        
    #uses bcrypt to compare the provided password with the stored hash   
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"User {self.username}"
        

# Project a many-to-one relationship with the User model and a one-to-many relationship with the Task model. 
class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False) # A brief description of the project
    start_date = db.Column(db.DateTime, nullable=False) # The date when the project starts
    end_date = db.Column(db.DateTime, nullable=False) # The date when the project ends
    status = db.Column(db.String, nullable=False) # Current status of the project - like "Not Started", "In Progress", "Completed"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Relationships
    users = db.relationship("User", secondary=user_project_association, back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete-orphan")
    
    
    # Serialization rules
    serialize_rules = ("-user_id", "tasks")
    
     # Validation
    @validates('title')
    def validate_title(self, key, title):
        if not isinstance(title, str):
            raise ValueError(f"{key} must be a string.")
        if not title or len(title) < 1:
            raise ValueError("Project must have a title.")
        if len(title) > 100:
            raise ValueError("Title must be shorter than 100 characters.")
        return title

    @validates('description')
    def validate_description(self, key, description):
        if not isinstance(description, str):
            raise ValueError(f"{key} must be a string.")
        if not description or len(description) < 1:
            raise ValueError("Description must not be empty.")
        if len(description) > 500:
            raise ValueError("Description must be shorter than 500 characters.")
        return description

    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = ["Not Started", "In Progress", "Completed"]
        if status not in valid_statuses:
            raise ValueError(f"{key} must be one of {valid_statuses}")
        return status
    
    
    def __repr__(self):
        return f"Project #{self.id} : {self.title}"


    
class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False) # A brief description of the task, user stories --- smaller unit of work from project
    due_date = db.Column(db.Date, nullable=False) # When the task is due
    priority = db.Column(db.String, nullable=False) # priority level of the task - like "High", "Medium", "Low"
    status = db.Column(db.String, nullable=False) # Current status of the task - like "Not Started", "In Progress", "Completed"
    
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Relationships
    project = db.relationship("Project", back_populates="tasks")
    comments = db.relationship("Comment", back_populates="task")

    # Serialization rules
    serialize_rules = ("-project_id", "comments")


    @validates('description')
    def validate_description(self, key, description):
        if not isinstance(description, str):
            raise ValueError(f"{key} must be a string.")
        if not description or len(description) < 1:
            raise ValueError("Description must not be empty.")
        if len(description) > 500:
            raise ValueError("Description must be shorter than 500 characters.")
        return description

    @validates('priority')
    def validate_priority(self, key, priority):
        valid_priorities = ["High", "Medium", "Low"]
        if priority not in valid_priorities:
            raise ValueError(f"{key} must be one of {valid_priorities}")
        return priority

    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = ["Not Started", "In Progress", "Completed"]
        if status not in valid_statuses:
            raise ValueError(f"{key} must be one of {valid_statuses}")
        return status
    
    
    def __repr__(self):
        return f"Task #{self.id} | User #{self.user_id}"
    
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))

    # Relationships
    user = db.relationship("User", back_populates="comments")
    task = db.relationship("Task", back_populates="comments")

    # Serialization rules
    serialize_rules = ("-user_id", "-task_id")
    
    @validates('text')
    def validate_text(self, key, text):
        if not isinstance(text, str):
            raise ValueError(f"{key} must be a string.")
        if not text or len(text) < 1:
            raise ValueError("Comment must not be empty.")
        if len(text) > 200:
            raise ValueError("Comment must be shorter than 200 characters.")
        return text
    
    def __repr__(self):
        return f"Comment #{self.id} | User #{self.user_id}"
