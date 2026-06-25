import { NavLink } from 'react-router-dom';

const linkClass=({isActive})=>
`block p-4 rounded-2xl transition ${isActive ? 'bg-emerald-500 text-white':'hover:bg-emerald-600/50 text-emerald-100'}`

export default function SellerSidebar(){
return(
<div className='w-72 min-h-screen p-8'  style={{background:"#22666B",}}>
<h2 className='text-3xl font-bold text-white mb-10'>Seller Panel</h2>
<div className='space-y-3'>
<NavLink to='/seller' end className={linkClass}>Dashboard</NavLink>
<NavLink to='/seller/orders' className={linkClass}>Orders</NavLink>
<NavLink to='/seller/earnings' className={linkClass}>Earnings</NavLink>
<NavLink to='/seller/products' className={linkClass}>Manage Products</NavLink>
<NavLink to='/seller/profile' className={linkClass}>Profile</NavLink>

</div>
</div>
)
}