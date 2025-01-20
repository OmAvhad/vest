from marshmallow import Schema, fields

class StockSchema(Schema):
    id = fields.Int(dump_only=True)
    trading_symbol = fields.Str(required=True)
    name = fields.Str(required=True)
    exchange = fields.Str(required=True)
    isin = fields.Str(required=True)
    name = fields.Str(required=True)
    current_price = fields.Float(required=True)
    close_price = fields.Float(required=True)
    
stock_schema = StockSchema()
stocks_schema = StockSchema(many=True)