
import NavBar from "@/components/NavBar";
import Image from 'next/image';
import Cherry from "@/assets/cherry.jpeg"
import Strawberry from "@/assets/strawberry.jpeg"
import Pineapple from "@/assets/pineapple.jpeg"
import Link from "next/link";

export default async function Home() {


  return (
    <div className="mx-12 grid place-items-center">
        <NavBar />
        <div className="carousel rounded-box gap-4 mt-16">
            <div className="carousel-item ">
                <Link href="/orders">
                    <div className="block">
                        <Image className="transition ease-in-out hover:-translate-y-4 hover:scale-110 duration-300" src={Cherry} alt="cherry"></Image>
                        <div className="w-full flex justify-center font-bold text-2xl mt-2">Orders</div>
                    </div>
                </Link>
            </div> 
            <div className="carousel-item">
                <div className="block">
                    <Image className="transition ease-in-out hover:-translate-y-4 hover:scale-110 duration-300"  src={Strawberry} alt="strawberry"></Image>
                    <div className="w-full flex justify-center font-bold text-2xl mt-2">Tools</div>
                </div> 
            </div> 
            <div className="carousel-item">
                <div className="block">
                    <Image className="transition ease-in-out hover:-translate-y-4 hover:scale-110 duration-300"  src={Pineapple} alt="pineapple"></Image>
                    <div className="w-full flex justify-center font-bold text-2xl mt-2">Accounting</div>
                </div> 
            </div> 
        </div>
    </div>
  )
}
