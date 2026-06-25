export default function DashboardSidebar(){

const items=[
"Dashboard",
"Place Order",
"My Orders",
"Tracking",
"Disputes",
"Profile"
];

return(
<div className="w-72 min-h-screen bg-indigo-700 text-white p-8">
<h2 className="text-3xl font-bold mb-10">
Buyer Panel
</h2>

<div className="space-y-4">
{items.map((item,index)=>(
<div
key={index}
className="p-4 rounded-2xl hover:bg-indigo-600 cursor-pointer"
>
{item}
</div>
))}
</div>

</div>
)
}