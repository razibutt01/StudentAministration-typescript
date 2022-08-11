import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import useFetch from "./CustomHook/useFetch";
import Body from "./components/Body";
import CustomizedDialogs from "./components/Popup";
import Create from "./AddEditForm/Create";
import type { Student } from "./components/ComponentTypes";
import { Paper } from "@mui/material";

export interface Dialogtype {
  handleClickOpens: () => void;
}
const UseStyles = makeStyles({
  App: {
    textAlign: "center",
    margin: "10px auto",
  },
});
function App() {
  const classes = UseStyles();
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
        <Container className={classes.App}>
          <Switch>
            <Container>
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
            </Container>
          </Switch>
        </Container>
      </Router>
    </AppContent.Provider>
  );
}

export default App;
