import "./App.css";
import useFetch from "./CustomHook/useFetch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Body from "./components/Body";

import React from "react";
import Create from "./AddEditForm/Create";

export interface Student {
  name: string;
  sex: string;
  Date_of_Birth: string;
  Place_of_Birth: string;
  groups: string[];
  id: number;
}

function App() {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [appstudents, setAppstudents] = React.useState<Student[]>([]);
  React.useEffect(() => {
    if (data?.length) {
      setAppstudents(data);
    }
  }, [data]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <div className="content">
            <h1>Student Administration Framework</h1>

            <Route exact path="/">
              <Body />
            </Route>
            <Route path="/create">
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {appstudents && (
                <Create createstu={appstudents} setCreatestu={setAppstudents} />
              )}
            </Route>
            <Route path="/edit/:id">
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {appstudents && (
                <Create createstu={appstudents} setCreatestu={setAppstudents} />
              )}
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
