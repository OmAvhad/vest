from marshmallow import Schema, fields

class OrderSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    stock_id = fields.Int(required=True)
    quantity = fields.Int(required=True)
    price = fields.Float(required=True)
    order_type = fields.Str(required=True)
    date = fields.DateTime(dump_only=True)
    
    
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)