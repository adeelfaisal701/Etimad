import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
export default function App(){
 return <AuthProvider><BrowserRouter>
   <ScrollToTop />
 <AppRoutes/></BrowserRouter></AuthProvider>
}
