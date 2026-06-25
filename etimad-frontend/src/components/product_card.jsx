import { Link } from "react-router-dom";
export default function ProductCard({product}){
return(
<div className='bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden'>
<img
src={product.image}
className='h-72 w-full object-fit'
/>

<div className='p-6'>
<h3 className='text-2xl font-semibold'>
{product.name}
</h3> 


<p className='text-gray-500 mt-2'>
{product.seller}
</p>

<div className='flex justify-between items-center mt-6'>
<span className='text-3xl font-bold'>
${product.price}
</span>

<Link to='/product/3'>
<button className='bg-indigo-600 text-white px-6 py-3 rounded-xl'>
View
</button>
</Link>




</div>
</div>
</div>
)
}