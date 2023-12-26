import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import UpdatePage from './pages/UpdatePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {AuthProvider} from './context/AuthContext';
import { Navbar } from './components/Navbar';
import MyProfile from './pages/MyProfile';
import Category from './pages/Category';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound'
import DoctorProfile from './pages/DoctorProfile';

function App() {

  
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/category/:skill' element={<Category/>}/>
        <Route path='/doctor/:username' element={<DoctorProfile/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path='/profile' element={<MyProfile/>}/>
        <Route path='/update' element={<UpdatePage/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
