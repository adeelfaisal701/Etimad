export default function AddProduct(){
return(
<div className="max-w-4xl mx-auto py-16">

<div className="bg-white p-10 rounded-3xl shadow">

<h2 className="text-4xl font-bold mb-8">
Add Product
</h2>

<input
className="border p-4 rounded-xl w-full mb-4"
placeholder="Product Name"
/>

<input
className="border p-4 rounded-xl w-full mb-4"
placeholder="Price"
/>

<textarea className="border p-4 rounded-xl w-full mb-4" />

<input type="file" />

<button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl mt-6">
Publish Product
</button>

</div>

</div>
)
}