import "./App.css";
import AllJobsPage from "./pages/All Jobs Page/AllJobsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JobDetails from "./pages/Job Details Page/JobDetails";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { keepTheme } from "./utils/theme";
function App() {
  useEffect(() => {
    keepTheme();
  });
  return (
    <div className="main__container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={AllJobsPage} />
          <Route path="/job/:jobId" component={JobDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
