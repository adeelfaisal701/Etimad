import { Link } from "react-router-dom";

export default function PlaceOrder(){
return(
<div className="max-w-3xl mx-auto py-16">
<div className="bg-white p-10 rounded-3xl shadow">

<h1 className="text-4xl font-bold mb-8">
Submit Order
</h1>

<input
className="border p-4 rounded-2xl w-full mb-5"
placeholder="Shipping Address"
/>

<input
className="border p-4 rounded-2xl w-full mb-5"
placeholder="Phone"
/>

<textarea
className="border p-4 rounded-2xl w-full mb-6"
placeholder="Notes"
/>
<Link to="/submit-payment">
<button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl">
Continue to Payment
</button>
</Link> 
</div>
</div>
)
}