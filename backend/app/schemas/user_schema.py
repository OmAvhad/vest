from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    username = fields.Str(required=True)
    password_hash = fields.Str(required=True, load_only=True)
    email = fields.Email(required=True)
    user_type = fields.Str(required=True)
    broker = fields.Str(required=True)
    balance = fields.Float(required=True)


user_schema = UserSchema()
