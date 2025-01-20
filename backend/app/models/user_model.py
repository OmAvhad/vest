from ..extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    user_type = db.Column(db.String, nullable=False, default="individual")
    broker = db.Column(db.String, nullable=True, default="ZERODHA")
    balance = db.Column(db.Float, nullable=False, default=0.0)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<User {self.username}>"