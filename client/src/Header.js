import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logoImage from "./images/bg12.jpg";

export default function Header() {
  // const { userdata } = props;

  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", {
        withCredentials: true,
      });
      console.log("response", response);
      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // logoout
  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };

  
  return (
    <header>
      {/* <Link to="/" className="logo" style={{ border: "2px solid black",borderRadius: "10px" , padding: "4px"}}>
        SupportHub
      </Link> */}
      <Link to="/" className="logo" style={{ padding: "4px", display: "flex", alignItems: "center" }}>
        <img src={logoImage} alt="Logo" style={{ width: "100px", height: "auto" }} />
      </Link>
      <nav>
        <Link to="/" style={{ border: "2px solid black",borderRadius: "10px", padding: "4px" }}>Home</Link>

        {/* {userdata && Object.keys(userdata).length > 0 ? ( */}
        {Object?.keys(userdata)?.length > 0 ? (
          <>
            <Link to="/options" style={{ border: "2px solid black",borderRadius: "10px" , padding: "4px"}}>Services</Link>

            <div onClick={logout} className="efg" style={{ border: "2px solid black",borderRadius: "10px" , padding: "4px"}}>Logout</div>

            <div className="abc">
              {/* show the image */}
              <img
                src={userdata?.image}
                style={{ width: "50px", borderRadius: "50%" }}
                alt=""
              />
              {/* show the name */}
              <div
                style={{
                  color: "black",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                {userdata?.displayName}
              </div>
            </div>
          </>
        ) : (
          <Link to="/login" style={{ border: "2px solid black",borderRadius: "10px" , padding: "4px"}}>Login</Link>
        )}
      </nav>
    </header>
  );
}
