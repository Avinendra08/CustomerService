import "./options.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Options() {
  //below part is to not allow a user wwho is not logged in to open this page
  const navigate = useNavigate();
  //const [userdata, setUserdata] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", {
        withCredentials: true,
      });
      console.log("response", response);
      //setUserdata(response.data.user);
    } catch (error) {
      navigate("*");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  //function to handle submit and post to backend the option and comments
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Getting user data from backend
      const response = await axios.get("http://localhost:6005/login/success", {
        withCredentials: true,
      });
      const user = response.data.user;

      // Sending the form data to backend
      const submitResponse = await axios.post(
        "http://localhost:6005/submit-service-request",
        {
          user,
          category: selectedOption,
          comments: additionalComments,
        }
      );

      if (submitResponse.data.success) {
        //agar sab kuch sahi hai to
        alert("Form submitted successfully");
        console.log("Form submitted successfully");
      } else {
        alert("Form submission failed");
        console.error("Error submitting form:", submitResponse.data.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      navigate("*");
    }
  };

  return (
    <div className="myFormContainer">
      <form onSubmit={handleSubmit}>
        <h1>We would love to hear from you.</h1>

        <select
          name="helpCategory"
          id="helpCategory"
          className="dropdown"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled selected>
            How can we help you?
          </option>
          <option value="generalQueries">General Queries</option>
          <option value="productFeatures">Product Features Queries</option>
          <option value="productPricing">Product Pricing Queries</option>
          <option value="featureImplementation">
            Product Feature Implementation Requests
          </option>
        </select>

        {/* Text input for additional details */}
        <input
          type="text"
          name="helpDetails"
          id="helpDetails"
          placeholder="Additional details..."
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
        />

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
