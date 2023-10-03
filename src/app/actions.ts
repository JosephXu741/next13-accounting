"use server"
import prisma from "@/db";

export async function updateTotalPrice(orderId: number) {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        include: {
            orderItems: true
        }
    })

    let totalPrice = 0;
    order?.orderItems.forEach(orderItem => {
        totalPrice += orderItem.totalItemPrice;
    })

    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            totalPrice
        }
    })
}

export async function getTotalPrice(orderId: number) {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        select: {
            totalPrice: true
        }
    })

    return order?.totalPrice
}