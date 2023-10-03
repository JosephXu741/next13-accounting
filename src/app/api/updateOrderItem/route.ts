import prisma from "@/db";
import { NextResponse } from "next/server";
import { updateTotalPrice } from "@/app/actions";

export async function POST(request: Request) {
    const data = await request.json()

    await prisma.orderItem.update({ where: { id: data.id }, data })

    // update total price in corresponding order

    const orderItem = await prisma.orderItem.findFirst({ where: { id: data.id }})

    const orderId = orderItem?.orderId

    if (orderId === undefined) {
        return NextResponse.json({success: false, message: 'unable to find associated order'})
    }
    
    await updateTotalPrice(orderId)

    return NextResponse.json({ success: true });
}