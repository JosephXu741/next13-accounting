export interface OrderProps {
    order: Order;
}

export interface Order {
    id: number
    customer: string;
    date: string;
    orderItems: Array<OrderItem>;
    totalPrice: number;
}

export interface OrderDetails {
    id: number
    customer: string;
    date: string;
    totalPrice: number;
}

export interface OrderItem {
    id : string
    qty: number;
    qtyType: string;
    name: string;
    price: number;
    totalItemPrice: number;
}