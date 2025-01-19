class InvalidPasswordError(Exception):
    def __init__(self):
        self.message = (
            "Password must have at least 8 characters, one letter and one number."
        )
        super().__init__(self.message)