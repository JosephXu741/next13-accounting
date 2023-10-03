'use client'

export default function OrderRow() {

    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="font-medium text-gray-800">3</div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">boxes</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">iceberg lettuce</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-center">13.50</div>
            </td>
        </tr>
    )
}