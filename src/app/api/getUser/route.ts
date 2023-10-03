import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const data = await request.json()

    const user = await prisma.user.findFirst()
    if (user === null) {
        return NextResponse.json({success: false, message: 'No users in database'})
    } 

    const hashedPassword = await sha256(data.password)
    const hashsedUsername = await sha256(data.username)

    if (hashsedUsername === user.username && hashedPassword === user.password) {
        return NextResponse.json({success: true, user});
    }

    return NextResponse.json({success: false, message: 'Invalid credentials'})


}

async function sha256(message: string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}