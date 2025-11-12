import {Routes, Route} from "react-router-dom";
import MainDashboard from "../MainPage/Main"
 
const Navigation = () =>{
    return (
         <Routes>
            <Route path="" element={<MainDashboard/>}></Route>            
         </Routes>
    )
}

export default Navigation;