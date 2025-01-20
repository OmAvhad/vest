from ..models.order_model import Order
from ..services.stock_service import StockService
from ..services.holding_service import HoldingService
from ..services.user_service import UserService


class OrderService:

    @staticmethod
    def get_all():
        return Order.query.all()

    @staticmethod
    def create(stock_id, user_id, order_type, quantity):
        """
        Create a new order and update holdings accordingly.
        Validates and updates user balance.
        Returns the created order or raises an exception if validation fails.
        """
        stock = StockService.get_by_id(stock_id)
        if not stock:
            raise ValueError("Stock not found")
        
        user = UserService.get_by_id(user_id)
        if not user:
            raise ValueError("User not found")

        # Get existing holding if any
        holding = HoldingService.get_by_user_id_and_stock_id(
            user_id, stock_id
        )
        
        # Calculate order total
        order_total = quantity * stock.current_price
        
        # Validate based on order type
        if order_type == "buy":
            if user.balance < order_total:
                raise ValueError("Insufficient balance")
        elif order_type == "sell":
            if not holding or holding.quantity < quantity:
                raise ValueError("Insufficient quantity to sell")
        else:
            raise ValueError("Invalid order type")

        order = Order(
            user_id=user_id,
            stock_id=stock_id,
            quantity=quantity,
            price=stock.current_price,
            order_type=order_type,
        )
        
        try:
            # Update user balance and holdings
            if order_type == "buy":
                user.balance -= order_total
                
                # Update or create holding
                if holding:
                    # Update existing holding
                    total_cost = (holding.quantity * holding.average_price) + order_total
                    total_quantity = holding.quantity + quantity
                    holding.average_price = total_cost / total_quantity
                    holding.quantity = total_quantity
                else:
                    # Create new holding
                    holding = HoldingService.create(
                        user_id=user_id,
                        stock_id=stock_id,
                        quantity=quantity,
                        average_price=stock.current_price,
                    )
            else: # Sell order
                user.balance += order_total
                holding.quantity -= quantity
                if holding.quantity == 0:
                    holding.delete()
            
            # Save order
            order.save()
            return order
        except Exception as e:
            print(e)
            raise ValueError("Failed to create order")

    @staticmethod
    def get_by_id(id):
        return Order.query.get(id)

    @staticmethod
    def get_orders_by_user_id(user_id):
        return Order.query.filter_by(user_id=user_id).all()
