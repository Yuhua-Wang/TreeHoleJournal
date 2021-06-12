import {LandingPage} from "./tmp/LandingPage";
import 'semantic-ui-css/semantic.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path='/' component={LandingPage}/>
          </Switch>
      </Router>
  );
}

export default App;
