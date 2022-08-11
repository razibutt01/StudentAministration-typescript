import React from "react";
import { Box, FormControlLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import type { SideProps } from "./ComponentTypes";
const UseStyles = makeStyles({
  side: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    maxWidth: "250px",
    "@media screen and (max-width:940px)": {
      maxWidth: "150px",
    },
    "@media screen and (max-width:845px)": {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #dddddd",
      maxWidth: "845px",
    },
    "@media screen and (max-width:470px)": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
  label: {
    margin: "4px 50px",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: "5px",
    "@media screen and (max-width:900px)": {
      maxWidth: "150px",
      alignItems: "center",
    },
    "@media screen and (max-width:845px)": {
      margin: "10px auto",
    },
    "@media screen and (max-width:470px)": {
      maxWidth: "470px",
    },
  },
});
const Side = ({ getfilter }: SideProps) => {
  const classes = UseStyles();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    getfilter(e.target.value);
  };

  return (
    <Box className={classes.side}>
      <FormControlLabel
        label="Chemistry"
        className={classes.label}
        control={
          <TextField
            type="checkbox"
            value="Chemistry"
            onChange={(e) => handleChange(e)}
          />
        }
      />

      <FormControlLabel
        label="Physics"
        className={classes.label}
        control={
          <TextField
            type="checkbox"
            value="Physics"
            onChange={(e) => handleChange(e)}
          />
        }
      />
      <FormControlLabel
        label="Maths"
        className={classes.label}
        control={
          <TextField
            type="checkbox"
            value="Maths"
            onChange={(e) => handleChange(e)}
          />
        }
      />
      <FormControlLabel
        label="Computer"
        className={classes.label}
        control={
          <TextField
            type="checkbox"
            value="Computer"
            onChange={(e) => handleChange(e)}
          />
        }
      />

      <FormControlLabel
        label="Biology"
        className={classes.label}
        control={
          <TextField
            type="checkbox"
            value="Biology"
            onChange={(e) => handleChange(e)}
          />
        }
      />
    </Box>
  );
};

export default Side;
