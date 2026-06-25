import { NavLink } from 'react-router-dom';

const linkClass=({isActive})=>
`block p-4 rounded-2xl transition ${isActive ? 'bg-emerald-500 text-white':'hover:bg-emerald-600/50 text-emerald-100'}`

export default function AdminSidebar(){
return(
<div className='w-72 min-h-screen p-8'  style={{background:"#22666B",}}>
<h2 className='text-3xl font-bold text-white mb-10'>Admin Panel</h2>
<div className='space-y-3'>
<NavLink to='/admin' end className={linkClass}><label className='text-white'>Dashboard</label></NavLink>
<NavLink to='/admin/users' className={linkClass}><label className='text-white'>Users</label></NavLink>
<NavLink to='/admin/products' className={linkClass}><label className='text-white'>Products</label></NavLink>
<NavLink to='/admin/orders' className={linkClass}><label className='text-white'>Orders</label></NavLink>
<NavLink to='/admin/profile' className={linkClass}><label className='text-white'>Profile</label></NavLink>

</div>
</div>
)
}