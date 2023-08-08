import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Navbar from "../components/Navbar";
import MyDataGrid from "../components/MyDataGrid";

function Home() {
  return (<div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    
    <div>
      <h1>Platforms</h1> <MyDataGrid /> 
    </div>

  </div>
  );
}
  
export default Home;