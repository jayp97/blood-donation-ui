import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import * as actions from "../actions/dCandidate";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles({
  root: {
    margin: "20px",
    padding: "20px",
  },
  head: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
});

const DCandidates = ({ ...props }) => {
  const classStyles = useStyles();

  const { dCandidateList, fetchAllDCandidates, deleteDCandidate } = props;

  const [currentId, setCurrentId] = useState(0);

  const { addToast } = useToasts();

  useEffect(() => {
    fetchAllDCandidates();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteDCandidate(id, () => {
        addToast("Deletion of record complete!", { appearance: "info" });
      });
    }
  };

  return (
    <Paper elevation={3} className={classStyles.root}>
      <Grid container className="grid">
        <Grid item xs={6}>
          <DCandidateForm {...{ setCurrentId, currentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer className="table-container">
            <Table>
              <TableHead>
                <TableRow className={classStyles.head}>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {dCandidateList.map((record, index) => {
                return (
                  <TableRow key={index} hover>
                    <TableCell>{record.fullName}</TableCell>
                    <TableCell>{record.mobile}</TableCell>
                    <TableCell>{record.bloodGroup}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="text">
                        <Button>
                          <EditIcon
                            color="primary"
                            onClick={() => {
                              setCurrentId(record.id);
                            }}
                          />
                        </Button>
                        <Button>
                          <DeleteIcon
                            color="secondary"
                            onClick={() => {
                              onDelete(record.id);
                            }}
                          />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    dCandidateList: state.dCandidate.list,
  };
};

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
  deleteDCandidate: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(DCandidates);
