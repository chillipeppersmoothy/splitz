import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SplitzProvider } from "./context/SplitzContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ExpensePage = lazy(() => import("./pages/ExpensePage"));
const SummaryPage = lazy(() => import("./pages/SummaryPage"));

function App() {
  return (
    <Router>
      <SplitzProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </SplitzProvider>
    </Router>
  );
}

export default App;
