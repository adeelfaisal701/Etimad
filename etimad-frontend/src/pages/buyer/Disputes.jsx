export default function Disputes(){
return(
<div>

<h1 className="text-4xl font-bold mb-8">
Disputes & Refunds
</h1>

<div className="bg-white rounded-3xl p-10 shadow">

<textarea
placeholder="Describe issue"
className="border rounded-2xl p-4 w-full mb-6"
/>

<button className="bg-red-600 text-white px-8 py-4 rounded-2xl">
Submit Dispute
</button>

</div>

</div>
)
}