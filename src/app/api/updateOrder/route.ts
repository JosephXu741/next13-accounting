import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json()

    await prisma.order.update({ where: { id: data.orderId }, data: {customer: data.newCustomer, date: data.newDate} })
    return NextResponse.json({ success: true });
}