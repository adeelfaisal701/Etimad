export default function Profile(){
return(
<div className="max-w-3xl">

<h1 className="text-4xl font-bold mb-8">
Profile
</h1>

<div className="bg-white p-10 rounded-3xl shadow">

<input
defaultValue="John Doe"
className="border p-4 rounded-xl w-full mb-4"
/>

<input
defaultValue="john@email.com"
className="border p-4 rounded-xl w-full mb-4"
/>

<button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl">
Update
</button>

</div>

</div>
)
}