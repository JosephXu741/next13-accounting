"use client"

import Link from "next/link";
import { addOrder, getAllOrders, deleteOrder } from "../app/actions"
import { useTransition, useEffect, useState } from "react"
import { OrderDetails } from "@/types/order";
import Bin from '../svgs/bin.svg'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrdersDrawer() {

    const [isLoadPending, startLoadTransition] = useTransition();
    const [isAddOrderPending, startAddOrderTransition] = useTransition();
    const [orders, setOrders] = useState<OrderDetails[]>([])
    const router = useRouter();

    const handleAddOrder = () => {
        startAddOrderTransition(async () => {
            const order = await addOrder()
            router.push('/orders?orderid=' + order.id)
        })
    }

    const handleDeleteOrder = (orderId: number) => {
        startLoadTransition(async () => {
            await deleteOrder(orderId)
            const orders = await getAllOrders();
            setOrders(orders)
        })
    }

    useEffect(() => {
        startLoadTransition(async () => {
            const orders = await getAllOrders();
            setOrders(orders)
        })
    }, [])

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li>
                        {isAddOrderPending 
                        ? 
                        <div>Loading</div> 
                        : 
                        <button onClick={handleAddOrder} className="btn btn-primary flex items-center mb-4">
                            <span>New order</span>
                        </button>}
                    </li>
                    {isLoadPending 
                    ? 
                    <div>loading</div>
                    : 
                    orders.map(order => (
                        <li className="relative"> 
                            <Link href={'/orders?orderid=' + order.id} className="w-full border border-gray-400 rounded block p-2 bg-gray-300/75 hover:bg-gray-300 mb-2">
                                <div className="font-semibold text-center mb-2 text-lg">{order.customer !== '' ? order.customer : '___________'}</div>
                                <div className="flex justify-between">
                                    <div>{order.date}</div>
                                    <div>${order.totalPrice}</div>
                                </div>
                            </Link>
                            <button onClick={() => handleDeleteOrder(order.id)} className="top-0 right-0 absolute">
                                <Image src={Bin} alt={""}></Image>
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}