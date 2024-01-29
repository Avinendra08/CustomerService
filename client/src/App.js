import "./App.css";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Options from "./Options";
import Error from "./Error";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // const [userdata, setUserdata] = useState({});
  // console.log("response", userdata);

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:6005/login/success", {
  //       withCredentials: true,
  //     });
  //     console.log("response", response);
  //     setUserdata(response.data.user);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/options" element={<Options/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
