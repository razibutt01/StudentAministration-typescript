import React from "react";
import TablePagination from "@mui/material/TablePagination";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { tableStudentProps } from "./ComponentTypes";
import type { Tableprops } from "./ComponentTypes";
import { makeStyles } from "@material-ui/core/styles";
const UseStyles = makeStyles({
  table: {
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    maxWidth: "750px",
    width: "100%",
    display: "inline-block",
  },
  td: {
    borderBottom: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
});
const Tables = ({
  tablestu,
  handleClickOpens,
  setTablestu,
  getId,
}: Tableprops) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = UseStyles();
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  console.log(tablestu.length);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const update = () => {
    fetch("http://localhost:5000/Students").then((result) => {
      result.json().then((resp: tableStudentProps[]) => {
        setTablestu(resp);
      });
    });
  };
  const handleDelete = (id: number) => {
    fetch("http://localhost:5000/Students/" + id, {
      method: "DELETE",
    }).then(() => {
      update();
    });
  };
  const handleStudent = (id: number) => {
    handleClickOpens();
    getId(id);
  };

  return (
    <div className="Table">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "300px", width: "100%" }}
      >
        <Table aria-label="simple table" stickyHeader className={classes.table}>
          <TableHead>
            <TableRow className={classes.td}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sex</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Place of Birth</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Groups</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tablestu.length > 0
              ? tablestu
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow key={student.id} className={classes.td}>
                      <TableCell
                        onClick={() => handleStudent(student.id)}
                        sx={{ color: "blue", cursor: "pointer" }}
                      >
                        {student.name}
                      </TableCell>

                      <TableCell>{student.sex}</TableCell>
                      <TableCell>{student.Place_of_Birth}</TableCell>
                      <TableCell>{student.Date_of_Birth}</TableCell>
                      <TableCell>
                        {student.groups.map((group) => (
                          <p>{group}</p>
                        ))}
                      </TableCell>
                      <TableCell>
                        <DeleteRoundedIcon
                          sx={{ cursor: "pointer" }}
                          color="primary"
                          onClick={() => handleDelete(student.id)}
                        />

                        {/* </Button> */}
                      </TableCell>
                    </TableRow>
                  ))
              : "No such student is here"}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ margin: "0" }}
        component="div"
        count={tablestu.length}
        page={page}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Tables;
