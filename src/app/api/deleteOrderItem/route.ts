import { updateTotalPrice } from "@/app/actions";
import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json()

    const orderItem = await prisma.orderItem.findFirst({ where: { id: data.id }})

    const orderId = orderItem?.orderId

    if (orderId === undefined) {
        return NextResponse.json({success: false, message: 'unable to find associated order'})
    }
    
    await prisma.orderItem.delete({ where: { id: data.id }})
    await updateTotalPrice(orderId)
    
    return NextResponse.json({ success: true });
}