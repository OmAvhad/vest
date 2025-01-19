from ..extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<User {self.username}>"