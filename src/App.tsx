import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const sessionToken = localStorage.getItem("sessionToken");

    setLoggedIn(accessToken !== null && sessionToken !== null);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route
              path={"/" + localStorage.getItem("sessionToken")}
              element={<Home />}
            />
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
