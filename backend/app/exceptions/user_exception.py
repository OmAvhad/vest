class UserAlreadyExistsError(Exception):

    def __init__(self, username):
        self.message = f"User with username '{username}' already exists"
        super().__init__(self.message)
