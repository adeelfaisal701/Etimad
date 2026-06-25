import { Link } from "react-router-dom";

export default function PaymentSubmission(){
return(
<div className="max-w-xl mx-auto mt-20">

<div className="bg-white rounded-3xl p-10 shadow">
<h2 className="text-3xl font-bold mb-8">
Submit Payment Proof
</h2>

<div className="bg-slate-100 p-6 rounded-2xl mb-8">
Admin Bank Details Here
</div>

<input
className="border p-4 rounded-xl w-full mb-4"
placeholder="Transaction ID"
/>

<input
type="file"
className="w-full mb-6"
/>
<Link to="/">
<button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
Submit Payment
</button>
</Link>
</div>

</div>
)
}