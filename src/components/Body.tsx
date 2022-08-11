import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper } from "@mui/material";
import type { Student } from "./ComponentTypes";
import type { Bodytype } from "./ComponentTypes";
import useFetch from "../CustomHook/useFetch";
import Side from "./SideBar";
import Tables from "./Tables";
import Top from "./TopBar";

const UseStyles = makeStyles({
  Body: {
    border: "1px solid #dddddd",
    width: "100%",
    margin: "0",
    boxSizing: "border-box",
    maxWidth: "sm",
    minHeight: "560px",
    "@media screen and (max-width:940px)": {
      maxWidth: "940px",
    },
  },
  BodyContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    boxSizing: "border-box",
    margin: "0",
    marginTop: "70px",
    "@media screen and (max-width:940px)": {
      maxWidth: "940px",
    },
  },
  Side: {
    maxwidth: "250px",
    marginTop: "50px",
    "@media screen and (max-width:845px)": {
      maxWidth: "845px",
      marginTop: "0",
      margin: "10px auto",
    },
  },
  Table: {
    boxSizing: "border-box",
    maxWidth: "750px",
    display: "inline-block",
    width: "100%",
    "@media screen and (max-width:1100px)": {
      maxWidth: "650px",
    },
    "@media screen and (max-width:990px)": {
      maxWidth: "600px",
    },
    "@media screen and (max-width:900px)": {
      maxWidth: "550px",
    },
    "@media screen and (max-width:845px)": {
      maxWidth: "845px",
    },
  },
});
const Body = ({ handleClickOpens, getId, handleID }: Bodytype) => {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [students, setStudents] = React.useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setResults] = React.useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = React.useState<Student[]>([]);
  const [GroupArr, setGroupArr] = React.useState<string[]>([]);
  const classes = UseStyles();
  const searchHandler = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newStudent = students.filter((student) => {
        return Object.values(student.name)
          .join("")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setResults(newStudent);
    } else {
      setResults(students);
    }
  };

  React.useEffect(() => {
    const newFilteredStudents = students.filter((student) =>
      student.groups.find((group) => {
        if (GroupArr.includes(group)) {
          return true;
        }
        return false;
      })
    );
    setFilteredStudents(newFilteredStudents);
  }, [GroupArr]);

  const handleFilter = (value: string) => {
    const current = GroupArr.indexOf(value);
    const newValue = [...GroupArr];
    if (current === -1) {
      newValue.push(value);
    } else {
      newValue.splice(current, 1);
    }
    setGroupArr(newValue);
  };
  console.log(GroupArr);

  React.useEffect(() => {
    if (data?.length) {
      setStudents(data);
    }
  }, [data]);

  return (
    <Container className={classes.Body} component={Paper} maxWidth="lg">
      <Box className="top">
        {students && (
          <Top
            topstudents={students}
            term={searchTerm}
            searchkeyword={searchHandler}
            handleClickOpen={handleClickOpens}
            handleID={handleID}
          />
        )}
      </Box>
      <Box className={classes.BodyContent}>
        <Box className={classes.Side}>
          {error && <Box>{error}</Box>}
          {isPending && <Box>Loading...</Box>}
          {students && <Side getfilter={(e: string) => handleFilter(e)} />}
        </Box>
        <Box className={classes.Table}>
          {error && <Box>{error}</Box>}
          {isPending && <Box>Loading...</Box>}

          {students && (
            <Tables
              tablestu={
                GroupArr.length > 0
                  ? filteredStudents
                  : searchTerm.length < 1
                  ? students
                  : searchResults
              }
              setTablestu={setStudents}
              getId={getId}
              handleClickOpens={handleClickOpens}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Body;
