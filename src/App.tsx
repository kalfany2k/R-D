import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import HowItWorks from "./Components/HowItWorks";
import BecomeAPartner from "./Components/BecomeAPartner";
import Layout from "./Components/Layout";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const sessionToken = localStorage.getItem("sessionToken");

    setLoggedIn(accessToken !== null && sessionToken !== null);
  }, []);


    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
              </Layout>
          }/>
            <Route path="how-it-works" element={
              <Layout>
            <HowItWorks />
            </Layout>} />
            <Route path="/become-a-partner" element={
              <Layout>
            <BecomeAPartner />
            </Layout>} />
          
        </Routes>
      </Router>
    );
  }
  
  export default App;