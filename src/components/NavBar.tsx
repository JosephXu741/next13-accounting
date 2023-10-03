import Link from "next/link";

export default function NavBar() {

    return (
        <div className="w-3/4 absolute top-0 flex justify-between p-4">
            <Link href='/'  className="p-2 rounded bg-sky-500/75 hover:bg-sky-500 text-white font-semibold" >
                Home
            </Link>
            <Link href='/addItem' className="p-2 rounded bg-sky-500/75 hover:bg-sky-500 text-white font-semibold">
                Add an item
            </Link>
        </div>
    )
}