// import {Navigate} from 'react-router-dom';
// import {useAuth} from '../../context/AuthContext';
// export default function ProtectedRoute({role,children}){
//  const {user}=useAuth();
//  if(!user) return <Navigate to='/buyer-login'/>;
//  if(role && user.role!==role) return <Navigate to='/'/>;
//  return children;
// }
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDashboardRoute } from "../../util/getDashboardRoutes";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to={getDashboardRoute(user.role)} />;
  }

  return children;
}