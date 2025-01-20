from marshmallow import Schema, fields, validate, post_dump
from ..schemas.stock_schema import StockSchema
from ..services.stock_service import StockService

class HoldingSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    stock_id = fields.Int(required=True)
    quantity = fields.Int(required=True, validate=validate.Range(min=0))
    average_price = fields.Float(required=True, validate=validate.Range(min=0))
    pnl = fields.Float(dump_only=True)
    day_change = fields.Float(dump_only=True)
    day_change_percentage = fields.Float(dump_only=True)
    
    @post_dump
    def calculate_dynamic_fields(self, data, **kwargs):
        """Calculate dynamic fields like PNL, day change, and day change percentage."""
        stock = StockService.get_by_id(id=data["stock_id"])
        if stock:
            quantity = data["quantity"]
            average_price = data["average_price"]

            # Calculate PNL
            data["pnl"] = (stock.current_price - average_price) * quantity

            # Calculate Day Change (difference between current price and close price)
            data["day_change"] = stock.current_price - stock.close_price

            # Calculate Day Change Percentage
            if stock.close_price != 0:
                data["day_change_percentage"] = (data["day_change"] / stock.close_price) * 100
            else:
                data["day_change_percentage"] = 0
        else:
            # Set default values if stock not found
            data["pnl"] = 0
            data["day_change"] = 0
            data["day_change_percentage"] = 0

        return data

    stock = fields.Nested(StockSchema, dump_only=True)


holding_schema = HoldingSchema()
holdings_schema = HoldingSchema(many=True)
