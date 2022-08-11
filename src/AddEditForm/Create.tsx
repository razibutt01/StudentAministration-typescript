import React from "react";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FormLabel } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateStudentProps } from "../components/ComponentTypes";
import type { Createprops } from "../components/ComponentTypes";
const UseStyles = makeStyles({
  create: {
    margin: 0,
    padding: 0,
  },
  text: {
    width: "100%",
    marginBottom: "6px",
  },
  textname: {
    width: "100%",
    marginBottom: "5px",
  },
  date: {
    marginTop: "10px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
  },
  groupBox: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "50px",
  },
  check: {
    gap: "5px",
  },
  btn: {
    marginTop: "10px",
    marginLeft: "40px",
  },
  form: {
    margin: "0",
    padding: "0",
  },

  invalidFeedback: {
    color: "red",
    fontSize: "small",
    marginTop: "0",
    textAlign: "center",
  },
  invalidFeedbackForSex: {
    color: "red",
    fontSize: "small",
    marginTop: "0",
  },
});
const Create = ({ createstu, setCreatestu, id }: Createprops) => {
  const classes = UseStyles();
  console.log(id);
  const isAddMode = !id;
  const [students, setStudents] = React.useState<CreateStudentProps[]>([]);
  const [isPending, setpending] = React.useState<boolean>(false);
  console.log(isAddMode);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "only alphabets | no special characters")
      .max(25, "Name could not be 25 characters long")
      .min(4, "Name must contain at least 4 characters")
      .required("Name is required"),
    Place_of_Birth: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "only alphabets are allowed")
      .required("Place of Birth is required"),
    Date_of_Birth: yup.string().required("Date of Birth is required"),
    sex: yup.string().nullable().required("Gender is required"),
    groups: yup
      .array()
      .nullable()
      .min(1, "minimum 1 field must be chosen ")
      .max(4, "maximum 4 fields can be chosen")
      .required("Groups are required"),
  });

  const { register, handleSubmit, reset, setValue, getValues, formState } =
    useForm<CreateStudentProps>({
      resolver: yupResolver(validationSchema),
    });
  const { errors } = formState;
  console.log(errors);
  function onSubmit(data: CreateStudentProps) {
    return isAddMode ? createStudent(data) : updatestudent(id, data);
  }
  const update = () => {
    fetch("http://localhost:5000/Students").then((result) => {
      result.json().then((resp) => {
        setCreatestu(resp);
      });
    });
  };
  const updatestudent = (
    id: number | string,
    updatedstudent: CreateStudentProps
  ) => {
    fetch(`http://localhost:5000/Students/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedstudent),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setCreatestu(
          createstu.map((student) =>
            student.id === id ? updatedstudent : student
          )
        );

        update();
      });
  };

  const createStudent = (data: CreateStudentProps) => {
    setpending(true);
    fetch("http://localhost:5000/Students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("response");
        setpending(false);
        return res.json();
      })

      .then((data) => {
        setCreatestu((prev: CreateStudentProps[]) => [...prev, data]);

        console.log("new student added");
      });
  };
  React.useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      fetch(`http://localhost:5000/Students/` + id)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const fields: Array<
            "name" | "Place_of_Birth" | "Date_of_Birth" | "sex" | "groups"
          > = ["name", "Place_of_Birth", "Date_of_Birth", "sex", "groups"];
          fields.forEach((field) => setValue(field, data[field]));
          setStudents(data);
        });
    }
  }, []);
  console.log("getValues", getValues());
  return (
    <Box className={classes.create}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <FormControl>
          {/* <h1>{isAddMode ? "Add Student" : "Edit Student"}</h1> */}
          <Box className={classes.textname}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              placeholder="Enter the Name"
              variant="outlined"
              // className={classes.textname}
              // className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              {...register("name")}
              defaultValue={!isAddMode ? { getValues } : ""}
            />
            <Box className={classes.invalidFeedback}>
              {errors.name?.message}
            </Box>
          </Box>
          <Box className="form-group">
            <TextField
              label="Place of Birth"
              type="text"
              placeholder="Enter the Country"
              className={classes.text}
              id="Place_of_Birth"
              {...register("Place_of_Birth")}
              defaultValue={!isAddMode ? { getValues } : ""}
            />
            <Box className={classes.invalidFeedback}>
              {errors.Place_of_Birth?.message}
            </Box>
          </Box>
          <Box className={classes.box}>
            <FormLabel htmlFor="Date_of_Birth">Date of Birth:</FormLabel>
            <TextField
              // FormLabel="Date of Birth"
              type="date"
              placeholder="Enter your Date of Birth"
              className={classes.date}
              id="Date_of_Birth"
              {...register("Date_of_Birth")}
              defaultValue={!isAddMode ? { getValues } : ""}
            />
            <Box className={classes.invalidFeedback}>
              {errors.Date_of_Birth?.message}
            </Box>
          </Box>

          <Box className="form-group">
            <FormLabel>Sex:</FormLabel>
            <Box sx={{ marginLeft: "50px" }}>
              <Box className="form-check form-check-inline">
                <FormControlLabel
                  label="Male"
                  className={classes.check}
                  control={
                    <TextField
                      type="radio"
                      value="Male"
                      {...register("sex")}
                      defaultValue={!isAddMode ? { getValues } : ""}
                      variant="filled"
                    />
                  }
                />
              </Box>
              <Box className="form-check form-check-inline">
                <FormControlLabel
                  label="Female"
                  className={classes.check}
                  control={
                    <TextField
                      type="radio"
                      value="Female"
                      {...register("sex")}
                      defaultValue={!isAddMode ? { getValues } : ""}
                      variant="filled"
                    />
                  }
                />
              </Box>
              <Box className={classes.invalidFeedbackForSex}>
                {errors.sex?.message}
              </Box>
            </Box>
          </Box>
          <Box>
            <FormLabel>Groups:</FormLabel>
            <Box className={classes.groupBox}>
              <FormControlLabel
                label="Maths"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Maths"
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />

              <FormControlLabel
                label="Chemistry"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Chemistry"
                    sx={{ gap: "5px" }}
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
              <FormControlLabel
                label="Physics"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Physics"
                    sx={{ gap: "5px" }}
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
              <FormControlLabel
                label="Computer"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Computer"
                    sx={{ gap: "5px" }}
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />

              <FormControlLabel
                label="Biology"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Biology"
                    sx={{ gap: "5px" }}
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
            </Box>
            <Box className={classes.invalidFeedback}>
              {errors.groups?.message}
            </Box>
          </Box>
          <Box className={classes.btn}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              sx={{ padding: "5px", marginRight: "20px" }}
            >
              {isAddMode ? "Submit" : "Save"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              type="reset"
              sx={{ padding: "5px" }}
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Create;
