import React from "react";
import { useRef } from "react";
import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import type { Topprops } from "./ComponentTypes";
import { Typography } from "@mui/material";

const UseStyles = makeStyles({
  Top: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyItems: "center",
    alignItems: "center",
    margin: 0,
    marginTop: "20px",

    boxSizing: "border-box",
    flexWrap: "wrap",
    /* border: 1px solid lightgray; */
    "@media screen and (max-width:630px)": {
      flexWrap: "no-wrap",
    },
    "@media screen and (max-width:545px)": {
      flexDirection: "row",
    },
  },
  Students: {
    display: "flex",
    flexDirection: "row",
    marginRight: "20px",
    gap: "3px",
    "@media screen and (max-width:500px)": {
      gap: "1px",
    },
    "@media screen and (max-width:480px)": {
      maxWidth: "480px",
      margin: "10px auto",
    },
  },
  h5: {
    marginRight: "15px",
    alignSelf: "center",
  },
  Search: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    flexGrow: 1,
    "@media screen and (max-width:545px)": {
      flexGrow: 0,
      flexDirection: "row",
      width: "40%",
    },
    "@media screen and (max-width:480px)": {
      maxWidth: "480px",
      margin: "10px auto",
    },
  },
  input: {
    padding: "5px",
    margin: "0px 20px",
    width: "30%",
    "@media screen and (max-width:545px)": {
      width: "90%",
    },
    "@media screen and (max-width:480px)": {
      width: "100%",
    },
  },
  btn: {
    margin: "0",
    padding: "0",
    marginTop: "10px",
    marginBottom: "10px",

    paddingRight: "2px",
    paddingLeft: "2px",
  },
});
const Top = ({
  topstudents,
  term,
  searchkeyword,
  handleClickOpen,
  handleID,
}: Topprops) => {
  const classes = UseStyles();
  const handleCHange = () => {
    handleClickOpen();
    handleID();
  };

  return (
    <Box className={classes.Top}>
      <Box className={classes.Search}>
        <TextField
          type="text"
          label="Search"
          // variant="outlined"
          placeholder="Search..."
          className={classes.input}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target !== null) {
              searchkeyword(e.target.value);
            }
          }}
          value={term}
          // onChange={handlechange}
        />
      </Box>
      <Box className={classes.Students}>
        <PersonIcon
          sx={{ fontSize: "24px ", padding: "1", alignSelf: "center" }}
        />
        <Typography className={classes.h5} variant="h6">
          {Object.keys(topstudents).length} Students
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCHange}
          className={classes.btn}
        >
          <EditIcon
            sx={{
              fontSize: "12px",
              borderRight: "1px solid white",
              marginRight: "5px",
              paddingRight: "5px",
              paddingTop: "0",
              paddingBottom: "0",
            }}
          />
          New
        </Button>
      </Box>
    </Box>
  );
};

export default Top;
