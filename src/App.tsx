import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { QuoteList } from "./pages/QuoteList";
import { CreateQuote } from "./pages/CreateQuote";
import { Navbar } from "./components/NavigationBar";
import { getToken } from "./utils/storage";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getToken();
  return token ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/" />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/quotes"
            element={
              <ProtectedRoute>
                <QuoteList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quote"
            element={
              <ProtectedRoute>
                <CreateQuote />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
