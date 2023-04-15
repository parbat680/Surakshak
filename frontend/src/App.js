import './App.css';
import Hero from './pages/Hero';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import UserSignUp from './pages/UserSignUp';
import NGOSignUp from './pages/NgoSignUp';
import HospitalSignUp from './pages/HospitalSignUp';
import VolunteerSignUp from './pages/VolunteerSignUp';
import Yoga from './pages/Yoga/Yoga';
import VolunteerDashboard from './pages/VolunteerDashboard';
import ManagePatients from './pages/ElderStats';
// import DrawerAppBar from './components/'
import NavigationBar from './components/NavigationBar'
import MyElders from './pages/MyElders';
import ElderStats from './pages/ElderStats';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavigationBar></NavigationBar>
      <Routes>
        <Route exact path="/" element={<Hero />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/usersignup" element={<UserSignUp />}></Route>       
        <Route exact path="/ngosignup" element={<NGOSignUp />}></Route>       
        <Route exact path="/hospitalsignup" element={<HospitalSignUp />}></Route>       
        <Route exact path="/volunteersignup" element={<VolunteerSignUp />}></Route>       
        {/* <Route exact path="/usersignup" element={<HospitalSign />}></Route>        */}
        {/* <Route exact path="/events" element={<Hero />}></Route>  */}
        <Route exact path="/yoga" element={<Yoga />}></Route> 
        <Route exact path="/volunteerdashboard" element={<VolunteerDashboard />}></Route>        
        <Route exact path="/myelders" element={<MyElders />}></Route> 
        <Route exact path="/elderstats" element={<ElderStats />}></Route> 

      </Routes>
    </BrowserRouter>

    </>

  );
}

export default App;