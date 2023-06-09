import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home";
import RegisterPage from "./Components/RegisterPage";
import EventPage from "./Components/EventPage";
import ProfilePage from "./Components/ProfilePage";
import NotFoundPage from "./Components/NotFoundPage";
import OrderHistoryPage from "./Components/OrderHistoryPage";
import HowItWorks from "./Components/HowItWorks";

export interface EventQuery {
  searchText: string;
  categories: string;
}

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
          {isLoggedIn && (
            <Route path="/profile/:sessionId" element={<ProfilePage />} />
          )}

          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/events/event/:eventId"
            element={<EventPage isLoggedIn={isLoggedIn} />}
          />
          <Route path="/events/search_events/:searchText" element={<Home />} />
          <Route
            path={"/" + ":sessionId" + "/order-history"}
            element={<OrderHistoryPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
