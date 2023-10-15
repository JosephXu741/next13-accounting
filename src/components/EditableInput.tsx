"use client"
import { OrderItem } from "@/types/order"

import { Dispatch, SetStateAction, useState } from "react"

type EditableInputProps = {
    orderItem: OrderItem
    handleDeleteItem: (orderItemId: string) => void
    handleUpdateItem: (orderItemId: string, orderItem: OrderItem) => void
}


export default function EditableInput({orderItem, handleUpdateItem, handleDeleteItem}: EditableInputProps) {

    const [newOrderItem, setNewOrderItem] = useState<OrderItem>(orderItem);
    const [isEdit, setIsEdit] = useState<boolean>(orderItem.totalItemPrice === 0 ? true : false);

    const handleUpdate = () => {
        setIsEdit(false)
        const newPrice: number = parseFloat((newOrderItem.qty * newOrderItem.price).toFixed(2))
        const modifiedOrderItem = {...newOrderItem, totalItemPrice: newPrice}
        setNewOrderItem(modifiedOrderItem)

        handleUpdateItem(newOrderItem.id, modifiedOrderItem)
    }

    const handleEditClick = () => {
        setIsEdit(true);
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
                    <div className="flex w-full justify-between">
                        <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 mr-2">
                            Update
                        </button>
                        <button onClick={() => handleDeleteItem(newOrderItem.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-18">
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
                    <div className="flex w-full justify-between">
                        <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 mr-2">
                            Edit
                        </button>
                        <button onClick={() => handleDeleteItem(newOrderItem.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-18">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        )
}