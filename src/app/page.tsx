
import prisma from "@/db"
import { redirect } from "next/navigation";
import Link from "next/link"
import NavBar from "@/components/NavBar";
import { RedirectType } from "next/dist/client/components/redirect";
import OrdersDrawer from "@/components/OrdersDrawer";

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
        <OrdersDrawer />
    </div>
  )
}
