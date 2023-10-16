import NavBar from "./NavBar";
import OrdersDrawer from "./OrdersDrawer";

export default function NoOrderScreen({title}: {title: string}) {


    return (
        <div>
            <NavBar />
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <p className="py-6">Please select an order to get started</p>
                        <OrdersDrawer />
                    </div>
                </div>
            </div>
        </div>
    )
}

