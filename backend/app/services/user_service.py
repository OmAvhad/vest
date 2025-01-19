from ..models.user_model import User
from werkzeug.security import generate_password_hash
from ..exceptions.user_exception import UserAlreadyExistsError
from ..exceptions.exceptions import InvalidPasswordError
import re


class UserService:

    @staticmethod
    def create(new_attrs):
        name = new_attrs["name"]
        username = new_attrs["username"]
        password = new_attrs["password"]
        
        # Check if the username already exists
        user = UserService.get_by_username(username)

        if user:
            raise UserAlreadyExistsError(username=username)
        
        # validate password with regex
        if not re.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$", password):
            raise InvalidPasswordError()
        
        # Generate a password hash
        password_hash = generate_password_hash(str(password))
        
        user = User(
            name=name,
            username=username,
            password_hash=password_hash,
        )
        user.save()
        
        return user

    @staticmethod
    def get_all():
        return User.query.all()

    @staticmethod
    def get_by_id(id):
        return User.query.get(id)

    @staticmethod
    def get_by_username(username):
        return User.query.filter_by(username=username).first()
