from marshmallow import Schema, fields


class HistoricalPriceSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.DateTime(required=True)
    price = fields.Float(required=True)
    instrument_name = fields.Str(required=True)


historical_price_schema = HistoricalPriceSchema()
historical_prices_schema = HistoricalPriceSchema(many=True)
