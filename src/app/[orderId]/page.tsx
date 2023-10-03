
import EditableInput from "@/components/EditableInput";
import prisma from "@/db"
import { redirect } from 'next/navigation'
import { Order, OrderItem } from "@/types/order";
import Link from "next/link";
import OrderHeader from "@/components/OrderHeader";
import OrderTotalPrice from "@/components/OrderTotalPrice";
import NavBar from "@/components/NavBar";

function getOrderItems(id: number) {
    return prisma.orderItem.findMany({where: {orderId: id}})
}

async function getOrder(id: number) {
    const order = await prisma.order.findFirst({where: {id}})
    const customer = order?.customer ?? ''
    const date = order?.date ?? ''
    const totalPrice = order?.totalPrice ?? 0
    return {customer, date, totalPrice}
}

export default async function Page({params}: {params: {orderId: string}}) {

    const orderId: number = parseInt(params.orderId);
    
    const orderItems: OrderItem[] = await getOrderItems(orderId);
    const {customer, date, totalPrice} = await getOrder(orderId);
    
    const handleAddItem = async () => {
        "use server"
        await prisma.orderItem.create({
            data: {
                qty: 0,
                qtyType: '',
                name: '',
                price: 0,
                totalItemPrice: 0,
                orderId
            }
        }) 
        redirect('/' + orderId)
    }

    return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4 grid place-items-center">
        <NavBar />
        <div className="flex flex-col justify-center h-full">
            <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <OrderHeader orderId={orderId} customer={customer} date={date}  />
                <div className="p-3">
                    <div className="overflow-x-auto">
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
                                    <th className="p-2 whitespace-nowrap"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {orderItems.map(orderItem => (
                                    <EditableInput orderItem={orderItem}/>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-between w-full">
                            <form action={handleAddItem}>
                                <button type="submit" className="p-2 rounded bg-sky-500/75 hover:bg-sky-500 text-white font-semibold">
                                    Add Item
                                </button>
                            </form>
                            <div className="">
                                <OrderTotalPrice orderId={orderId} totalPrice={totalPrice}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <Link 
                    href={{
                        pathname: `/${orderId}/print`
                    }} 
                    className="p-2 px-4 rounded bg-gray-700/75 hover:bg-gray-700 text-white font-semibold">
                        Print
                    </Link>
                </div>
            </div>
        </div>
    </section>
)}

