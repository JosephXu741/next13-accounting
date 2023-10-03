"use client"
import { OrderItem } from "@/types/order"

import { useState } from "react"

type EditableInputProps = {
    orderItem: OrderItem
}


export default function EditableInput({orderItem}: EditableInputProps) {

    const [newOrderItem, setNewOrderItem] = useState<OrderItem>(orderItem);
    const [isEdit, setIsEdit] = useState<boolean>(orderItem.totalItemPrice === 0 ? true : false);

    const handleUpdate = async () => {
        setIsEdit(false)
        const newPrice: number = parseFloat((newOrderItem.qty * newOrderItem.price).toFixed(2))
        setNewOrderItem({...newOrderItem, totalItemPrice: newPrice})

        await fetch('/api/updateOrderItem', {
            method: 'POST', 
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                ...newOrderItem,
                totalItemPrice: newPrice
            })
        })

    }

    const handleEditClick = () => {
        setIsEdit(true);
    }

    const handleDelete = async () => {
        await fetch('/api/deleteOrderItem', {
            method: 'POST', 
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newOrderItem)
        })
        window.location.reload()
    }

    return isEdit === true ?
        (
            <tr>
                <td className="p-2 whitespace-nowrap">
                    <input 
                        onChange={(e) => setNewOrderItem({...newOrderItem, qty: parseInt(e.target.value)})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" 
                        defaultValue={newOrderItem.qty}/>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <input 
                        onChange={(e) => setNewOrderItem({...newOrderItem, qtyType: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" 
                        defaultValue={newOrderItem.qtyType}/>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <input 
                        onChange={(e) => setNewOrderItem({...newOrderItem, name: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" 
                        defaultValue={newOrderItem.name}/>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <input 
                        onChange={(e) => setNewOrderItem({...newOrderItem, price: parseFloat(e.target.value)})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" 
                        defaultValue={newOrderItem.price}/>
                </td>
                <td className="p-2 whitespace-nowrap">{newOrderItem.totalItemPrice}</td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex">
                        <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-16 mr-2">
                            Save
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-18">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        ) :
        (
            <tr>
                <td className="p-4 whitespace-nowrap bg-gray-50">{newOrderItem.qty}</td>
                <td className="p-4 whitespace-nowrap">{newOrderItem.qtyType}</td>
                <td className="p-4 whitespace-nowrap bg-gray-50">{newOrderItem.name}</td>
                <td className="p-4 whitespace-nowrap">{newOrderItem.price}</td>
                <td className="p-4 whitespace-nowrap bg-gray-50">{newOrderItem.totalItemPrice}</td>
                <td className="whitespace-nowrap">
                    <div className="flex">
                        <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-16 mr-2">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-18">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        )
}