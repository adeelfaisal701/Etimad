const steps=[
"Pending Payment",
"Payment Verified",
"Processing",
"Shipped",
"Delivered",
"Completed"
];

export default function OrderTimeline(){
return(
<div className="bg-white rounded-3xl shadow p-8">

<h2 className="text-2xl font-bold mb-10">
Order Progress
</h2>

<div className="flex flex-wrap gap-6">
{steps.map((step,index)=>(
<div
key={index}
className="flex items-center gap-3"
>
<div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
{index+1}
</div>

<span className="font-medium">
{step}
</span>

</div>
))}
</div>

</div>
)
}