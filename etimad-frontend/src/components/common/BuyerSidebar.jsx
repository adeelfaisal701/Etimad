import { NavLink } from 'react-router-dom';

const linkClass=({isActive})=>
`block p-4 rounded-2xl transition ${isActive ? 'bg-emerald-500 text-white':'hover:bg-emerald-600/50 text-emerald-100'}`

export default function BuyerSidebar(){
return(
<div className='w-72 min-h-screen p-8' style={{background:"#22666B",}}>
<h2 className='text-3xl font-bold text-white mb-10'>Buyer Panel</h2>

<div className='space-y-3'>
<NavLink to='/buyer-dashboard' end className={linkClass}>Dashboard</NavLink>
<NavLink to='/buyer-dashboard/orders' className={linkClass}>My Orders</NavLink>
{/* <NavLink to='/buyer-dashboard/tracking' className={linkClass}>Tracking</NavLink> */}
{/* <NavLink to='/buyer-dashboard/disputes' className={linkClass}>Disputes</NavLink> */}
<NavLink to='/buyer-dashboard/profile' className={linkClass}>Profile</NavLink>
</div>
</div>
)
}