"use client"

import EditableInput from "@/components/EditableInput";
import { Order, OrderItem } from "@/types/order";
import { useState, useTransition, useEffect } from "react";
import uuid from "react-uuid";
import { getOrder, saveOrder } from "../actions";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import OrdersDrawer from "@/components/OrdersDrawer";
import NoOrderScreen from "@/components/NoOrderScreen";



export default function Page({searchParams}: {searchParams: {orderid: string}}) {

    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [customer, setCustomer] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [deleteList, setDeleteList] = useState<string[]>([])
    const [noOrder, setNoOrder] = useState<boolean>(false);

    useEffect(() => {
        startTransition(async () => {
            const order = await getOrder(parseInt(searchParams.orderid))

            if (order && order !== undefined) {
                setCustomer(order.customer as string)
                setDate(order?.date as string)
                setTotalPrice(order?.totalPrice as number)
                setOrderItems(order ? order.orderItems : [])
                setNoOrder(false);
            } else {
                setNoOrder(true)
            }
        })
    }, [searchParams])

    useEffect(() => {
        const newTotalPrice = parseFloat(orderItems.reduce((total, orderItem) => total + orderItem.totalItemPrice, 0).toFixed(2))
        setTotalPrice(newTotalPrice)

    }, [orderItems])

    const handleAddItem = () => {
        const newOrderItem: OrderItem = {
            id: uuid(),
            qty: 0,
            qtyType: "",
            name: "",
            price: 0,
            totalItemPrice: 0
        }
        setOrderItems([...orderItems, newOrderItem]);
    }

    const handleDeleteItem = (orderId: string) => {
        const filteredOrderItems = orderItems.filter(orderItem => orderItem.id !== orderId)

        setOrderItems(filteredOrderItems)
        setDeleteList([...deleteList, orderId])
    }

    const handleUpdateItem = (orderId: string, newOrderItem: OrderItem) => {
        const newOrderItems = orderItems.map(orderItem => {
            if (orderItem.id === orderId) {
                return newOrderItem
            } else {
                return orderItem
            }
        })

        setOrderItems(newOrderItems)
    }

    const handleSaveOrder = () => {
        startTransition(async () => {
            await saveOrder(parseInt(searchParams.orderid), customer, date, totalPrice, orderItems, deleteList)
            setDeleteList([])
        })
    }

    const handlePrint = () => {
        startTransition(async () => {
            await saveOrder(parseInt(searchParams.orderid), customer, date, totalPrice, orderItems, deleteList)
            setDeleteList([])
            router.push('print?orderId=' + searchParams.orderid)
        })
    }

    if (searchParams.orderid === undefined) {
        return <NoOrderScreen title="No Order Selected" />
    }

    if (noOrder) {
        return <NoOrderScreen title="Order doesn't exist" />
    }

    if (isPending) {
        return (
            <div className="w-full h-screen grid place-items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (
    <div className="antialiased text-gray-600 px-4 grid place-items-center">
        <NavBar />
        <div className="absolute left-4 top-20">
            <OrdersDrawer />
        </div>
        <div className="flex flex-col justify-center mt-24">
            <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <div className="p-3">
                    <div className="overflow-x-auto">
                    <header className="px-5 py-4 border-b border-gray-100 inline-grid grid-cols-2 w-full">
                        <div className="inline-grid">
                            <h2 className="font-semibold text-gray-800">Customer Name: </h2>
                            <input onChange={(e) => setCustomer(e.target.value)} type="text" name="customer" className="border rounded pl-1" defaultValue={customer}></input>
                        </div>
                        <div className="inline-grid justify-self-end ">
                            <h2 className="font-semibold text-gray-800">Date: </h2>
                            <input onChange={(e) => setDate(e.target.value)} type="date" name="date" className="border rounded pl-1" defaultValue={date}></input>
                        </div>
                    </header>
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">QTY</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">QTY Type</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Description</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Price</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Total</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-1/5"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {orderItems.map(orderItem => (
                                    <EditableInput key={orderItem.id} orderItem={orderItem} handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem}/>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-between w-full">
                            <button onClick={handleAddItem} className="p-2 rounded bg-sky-500/75 hover:bg-sky-500 text-white font-semibold">
                                Add Item
                            </button>
                            <div className="grid place-items-center">
                                <span className="p-2 font-semibold text-xl">Total Price: {totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 flex">
                    <button onClick={handlePrint} className=" p-2 px-4 rounded bg-gray-500/75 hover:bg-gray-500 text-white font-semibold">
                        Print
                    </button>
                    <button onClick={handleSaveOrder} className=" p-2 px-4 mx-4 rounded bg-green-500/75 hover:bg-green-500 text-white font-semibold">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

