import prisma from '@/db';
import { OrderProps, Order } from '@/types/order';

function getOrder(orderId: number) {

    const order = prisma.order.findFirst({
        where: {id: orderId},
        include: {
            orderItems: true
        }
    })

    return order
}

export default async function Page({searchParams}: {searchParams: {orderId: string}}) {

    const orderId: number = parseInt(searchParams.orderId);

    const order: Order | null = await getOrder(orderId);

    if (order === null) {
        return <div>Unable to find order</div>;
    }


    return (
        <div className="w-full grid px-4 pt-8 pb-2">
            <div className="pb-4">
                <p>Original</p>
            </div>
            <div className="pb-4">
                <p className="text-4xl font-bold">TAX INVOICE* / STATEMENT*</p>
                <p>(* DELETE AS APPROPRIATE)</p>
            </div>
            <div className="flex justify-end">
                <p className="pr-1">DATE</p>
                <p className="border-b-2 border-black">{order.date}</p>
            </div>
            <div className="border-b-2 border-black w-full h-8">
                <p>TO: {order.customer}</p>
            </div>
            <div className="border-b-2 border-black w-full h-8"></div>
            <div className="flex">
                <div className="border-b-2 border-r-2 border-black w-2/3 h-8">
                    <p>ABN (of Recipient) </p>
                </div>
                <div className="border-b-2 border-black w-1/3 h-8">
                    <p className="pl-2">ORDER NO.</p>
                </div>
            </div>
            <div className="border-b-2 border-black w-full h-8">
                <p>FROM Paddy's Fresh Pty Ltd</p>
            </div>
            <div className="border-b-2 border-black w-full h-8"></div>
            <div className="border-b-2 border-black w-full h-8">
                <p>ABN (of Supplier) </p>
            </div>
            <table className="table-auto border-2 border-collapse border-black mt-4">
                <thead>
                    <tr>
                        <th className="border-2 border-black">QTY</th>
                        <th className="border-2 border-black">DESCRIPTION</th>
                        <th className="border-2 border-black">PRICE</th>
                        <th className="border-2 border-black">G.S.T</th>
                        <th className="border-2 border-black">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderItems.map(item => (
                        <tr>
                            <td className="border-2 border-black">{`${item.qty} ${item.qtyType}`}</td>
                            <td className="border-2 border-black">{item.name}</td>
                            <td className="border-2 border-black">${item.price.toString()}</td>
                            <td className="border-2 border-black"></td>
                            <td className="border-2 border-black">${item.totalItemPrice.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="relative pb-24">
                <div className="flex justify-end mt-4 absolute bottom-0 right-0">
                    <p className="text-xl font-semibold">TOTAL INCLUSIVE OF GST</p>
                    <p className="border-2 border-black px-2 ml-2 text-xl">${order.totalPrice}</p>
                </div>
            </div>
        </div>
    )
}