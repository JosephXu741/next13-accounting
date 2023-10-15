"use server"
import prisma from "@/db";
import { OrderItem } from "@/types/order";

export async function getOrder(orderId: number) {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        include: {
            orderItems: true
        }

    })

    return order
}

export async function getAllOrders() {
    return await prisma.order.findMany({
        select: {
            id: true,
            customer: true,
            date: true,
            totalPrice: true
        }
    })
}

export async function deleteOrder(orderId: number) {
    await prisma.orderItem.deleteMany({
        where: {orderId}
    })
    await prisma.order.delete({
        where: {id: orderId}
    })
}

export async function saveOrder(orderId: number, customer: string, date: string, totalPrice: number, orderItems: OrderItem[], deleteList: string[]) {
    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            customer,
            date,
            totalPrice
        }
    })

    orderItems.forEach(async orderItem => {
        await prisma.orderItem.upsert({
            where: {
                id: orderItem.id,
                orderId
            },
            update: {
                qty: orderItem.qty,
                qtyType: orderItem.qtyType,
                name: orderItem.name,
                price: orderItem.price,
                totalItemPrice: orderItem.totalItemPrice
            },
            create: {
                id: orderItem.id,
                qty: orderItem.qty,
                qtyType: orderItem.qtyType,
                name: orderItem.name,
                price: orderItem.price,
                totalItemPrice: orderItem.totalItemPrice,
                orderId: orderId
            }
        })
    })

    await prisma.orderItem.deleteMany({
        where: {
            id: {
                in: deleteList
            }
        }
    })
}

export async function addOrder() {
    const newOrder = await prisma.order.create({
        data: {
            customer: '',
            date: '',
            totalPrice: 0
        }
    })

    return newOrder
}