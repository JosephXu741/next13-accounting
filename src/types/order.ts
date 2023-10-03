export interface OrderProps {
    order: Order;
}

export interface Order {
    customer: string;
    date: string;
    orderItems: Array<OrderItem>;
    totalPrice: number;
}

export interface OrderItem {
    qty: number;
    qtyType: string;
    name: string;
    price: number;
    totalItemPrice: number;
}