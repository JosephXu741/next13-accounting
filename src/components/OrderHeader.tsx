"use client"
import { OrderItem } from "@/types/order"

import { useState } from "react"

type OrderHeaderProps = {
    orderId: number
    customer: string
    date: string
}

export default function OrderHeader({orderId, customer, date}: OrderHeaderProps) {

    const [newCustomer, setNewCustomer] = useState(customer)
    const [newDate, setNewDate] = useState(date)

    const updateOrder = async () => {

        await fetch('/api/updateOrder', {
            method: 'POST', 
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({orderId, newCustomer, newDate})
        })
    }

    return (
        <header className="px-5 py-4 border-b border-gray-100 inline-grid grid-cols-2 w-full">
            <div className="inline-grid">
                <h2 className="font-semibold text-gray-800">Customer Name: </h2>
                <input onChange={(e) => setNewCustomer(e.target.value)} onBlur={updateOrder} type="text" name="customer" className="border rounded pl-1" defaultValue={newCustomer}></input>
            </div>
            <div className="inline-grid justify-self-end ">
                <h2 className="font-semibold text-gray-800">Date: </h2>
                <input onChange={(e) => setNewDate(e.target.value)} onBlur={updateOrder} type="date" name="date" className="border rounded pl-1" defaultValue={newDate}></input>
            </div>
        </header>
    )
}