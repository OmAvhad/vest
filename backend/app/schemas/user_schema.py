from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    username = fields.Str(required=True)
    password_hash = fields.Str(required=True, load_only=True)


user_schema = UserSchema()
