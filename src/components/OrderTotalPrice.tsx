'use client'

import { getTotalPrice} from "@/app/actions"
import { useState, useTransition } from "react"

type OrderTotalPriceProps = {
    orderId: number
    totalPrice: number
}

export default function OrderTotalPrice({orderId, totalPrice}: OrderTotalPriceProps) {

    const [isPending, startTransition] = useTransition();
    const [newTotalPrice, setTotalPrice] = useState(totalPrice);

    const handleClick = async () => {
        startTransition(async () => {
            const newPrice = await getTotalPrice(orderId)
            if (newPrice === undefined) {
                setTotalPrice(0)
            } else {
                setTotalPrice(newPrice)
            }
        })
    }

    return (
        <div className="flex">
            <div className="grid items-center mr-2">
                <p className="font-semibold text-xl">
                    Total: ${newTotalPrice.toFixed(2)}
                </p>
            </div>
            <button className="p-2 rounded bg-sky-500/75 hover:bg-sky-500 text-white font-semibold" onClick={handleClick}>Calculate Total</button>
        </div>
    )
}