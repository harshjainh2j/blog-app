import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
     authService.getCurrentStatus()
    .then((userData) => {
      console.log("userData after login",userData)
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

    


 return !loading?(
 <div className="min-h-screen flex felx-wrap content-between bg-gray-400">
 <div className="w-full block">
  <Header/>
  <main>
    <Outlet/>
  </main>
  <Footer/>
 </div>
 </div>):"Loading...";
}

export default App;
