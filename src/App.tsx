import "./App.css";
import useFetch from "./CustomHook/useFetch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Body from "./components/Body";
import CustomizedDialogs from "./components/Popup";
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
export interface Dialogtype {
  handleClickOpens: () => void;
}
function App() {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [appstudents, setAppstudents] = React.useState<Student[]>([]);
  const [id, getId] = React.useState<number>(0);
  React.useEffect(() => {
    if (data?.length) {
      setAppstudents(data);
    }
  }, [data]);
  const initialState: Dialogtype = {
    handleClickOpens: () => {},
  };
  const AppContent = React.createContext<Dialogtype>(initialState);

  const [open, setOpen] = React.useState(false);
  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleID = () => {
    getId(0);
  };
  const handleId = (id: number) => {
    getId(id);
  };
  return (
    <AppContent.Provider value={{ handleClickOpens }}>
      <Router>
        <div className="App">
          <Switch>
            <div className="content">
              <h1>Student Administration Framework</h1>

              <Route exact path="/">
                <Body
                  handleClickOpens={handleClickOpens}
                  getId={(id: number) => handleId(id)}
                  handleID={handleID}
                />
              </Route>
              <Route>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {appstudents && (
                  <CustomizedDialogs
                    open={open}
                    setOpen={setOpen}
                    handleClickOpen={handleClickOpens}
                  >
                    <Create
                      id={id}
                      createstu={appstudents}
                      setCreatestu={setAppstudents}
                    />
                  </CustomizedDialogs>
                )}
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
    </AppContent.Provider>
  );
}

export default App;
