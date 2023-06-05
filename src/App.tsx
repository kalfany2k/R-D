import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./Components/Home";
import RegisterPage from "./Components/RegisterPage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const sessionToken = localStorage.getItem("sessionToken");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const sessionToken = localStorage.getItem("sessionToken");

    setLoggedIn(accessToken !== null && sessionToken !== null);
  }, [localStorage.getItem("sessionToken")]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
            <Route
              path={"/" + sessionToken?.substring(0, 10)}
              element={<Home />}
            />
          ) : (
            <></>
          )}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
