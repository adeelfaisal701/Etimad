// import {Outlet} from 'react-router-dom';
// import BuyerSidebar from '../components/common/BuyerSidebar';
// import SellerSidebar from '../components/common/SellerSidebar';
// import AdminSidebar from '../components/common/AdminSidebar';

// export default function DashboardLayout({role='buyer'}){
// const sidebarMap={
//  buyer:<BuyerSidebar/>,
//  seller:<SellerSidebar/>,
//  admin:<AdminSidebar/>
// }

// return(
// <div className='flex min-h-screen bg-slate-100'>
// {sidebarMap[role]}

// <div className='flex-1 p-10'>
// <Outlet/>
// </div>
// </div>
// )
// }

import { Outlet, useNavigate } from 'react-router-dom';
import BuyerSidebar from '../components/common/BuyerSidebar';
import SellerSidebar from '../components/common/SellerSidebar';
import AdminSidebar from '../components/common/AdminSidebar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ role = 'buyer' }) {
  const { logout, user, switchRole } = useAuth();
  const navigate = useNavigate();

  const sidebarMap = {
    buyer: <BuyerSidebar />,
    seller: <SellerSidebar />,
    admin: <AdminSidebar />
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  const handleSwitchAccount = async () => {
    try {
      const updatedUser = await switchRole();
      if (updatedUser.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (updatedUser.role === 'seller') {
        navigate('/seller');
      }
    } catch (err) {
      alert("Failed to switch account");
    }
  };

  return (
    <div className='flex min-h-screen bg-slate-100'>

      {/* Sidebar */}
      {sidebarMap[role]}

      {/* Main Content */}
      <div className='flex-1'>

        {/*   Top Bar */}
        <div className='flex justify-between items-center bg-white px-10 py-4 shadow'>
          
          <h2 className='text-xl font-semibold capitalize'>
            {user?.role} Dashboard
          </h2>

          <div className='flex gap-3'>
            {user && user.role !== 'admin' && (
              <button
                onClick={handleSwitchAccount}
                className='bg-teal-600 text-white px-5 py-2 rounded-xl hover:bg-teal-700 transition font-semibold'
              >
                Switch to {user.role === 'buyer' ? 'Seller' : 'Buyer'}
              </button>
            )}
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition'
            >
              Logout
            </button>
          </div>

        </div>

        {/* Page Content */}
        <div className='p-10'>
          <Outlet />
        </div>

      </div>
    </div>
  );
}