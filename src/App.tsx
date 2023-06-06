import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
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
          <Route path={"/" + sessionToken?.slice(0, 10)} element={<Home />} />
          {isLoggedIn && (
            <Route
              path="/"
              element={<Navigate to={"/" + sessionToken?.slice(0, 10)} />}
            />
          )}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
