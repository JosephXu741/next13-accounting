
import prisma from "@/db"
import { redirect } from "next/navigation";
import Link from "next/link"
import NavBar from "@/components/NavBar";
import { RedirectType } from "next/dist/client/components/redirect";

function getOrders() {
    return prisma.order.findMany({
        select: {
            id: true,
            customer: true,
            date: true
        }
    })
}

export default async function Home() {

    const orders = await getOrders();

    const handleAddOrder = async () => {
        "use server"
        const newOrder = await prisma.order.create({
            data: {
                customer: '',
                date: '',
                totalPrice: 0
            }
        })

        redirect('/' + newOrder.id, RedirectType.push)
    }


  return (
    <div className="w-full grid mt-36 place-items-center p-8">
        <NavBar />
        <h1 className="font-semibold text-3xl mb-8">ORDERS:</h1>
        {orders.map(order => (
            <Link href={'/' + order.id} className="w-1/2 border border-gray-400 rounded flex px-12 py-6 justify-between bg-gray-300/75 hover:bg-gray-300 mb-2">
                <div className="font-semibold">{order.customer}</div>
                <div>{order.date}</div>
            </Link>
        ))}
        <div className="w-1/2 grid justify-center">
            <form className="w-full">
                <button formAction={handleAddOrder} className="w-full rounded grid place-items-center px-12 py-6 bg-blue-300/75 hover:bg-blue-300 font-semibold">
                    New order
                </button>
            </form>
        </div>
    </div>
  )
}
