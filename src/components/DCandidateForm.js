import React, { useState, useEffect, useRef } from "react";
import * as actions from "../actions/dCandidate";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import useForm from "./useForm";

const initialFieldValues = {
  fullName: "",
  age: "",
  address: "",
  mobile: "",
  bloodGroup: "",
  email: "",
};

const useStyles = makeStyles({
  root: {
    "& .MuiTextField-root": {
      margin: "18px",
      minWidth: "230px",
    },
  },
  formControl: {
    margin: "18px",
    minWidth: "230px",
  },
  smMargin: {
    margin: "18px",
  },
});

const DCandidateForm = ({ ...props }) => {
  const {
    dCandidateList,
    createDCandidate,
    updateDCandidate,
    currentId,
    setCurrentId,
  } = props;

  const { addToast } = useToasts();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classStyles = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues) {
      temp.fullName = fieldValues.fullName ? "" : "This field is required!";
    }
    if ("mobile" in fieldValues) {
      temp.mobile = fieldValues.mobile ? "" : "This field is required!";
    }
    if ("bloodGroup" in fieldValues) {
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required!";
    }
    if ("email" in fieldValues) {
      temp.email =
        /^$|.+@.+..+/.test(fieldValues.email) && fieldValues.email
          ? ""
          : "Email is not valid";
    }
    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, setCurrentId, validate);
  console.log("values", values);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted Sucessfully", { appearance: "success" });
      };
      if (currentId === 0) {
        createDCandidate(values, onSuccess);
      } else {
        updateDCandidate(currentId, values, onSuccess);
      }
    }
  };

  useEffect(() => {
    if (currentId !== 0) {
      setValues(dCandidateList.find((cd) => cd.id === currentId));
      setErrors({});
    }
  }, [currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      className={classStyles.root}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            required
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            required
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <FormControl
            variant="outlined"
            className={classStyles.formControl}
            required
            {...(errors.bloodGroup && { error: true })}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A +</MenuItem>
              <MenuItem value="A-">A -</MenuItem>
              <MenuItem value="B+">B +</MenuItem>
              <MenuItem value="B-">B -</MenuItem>
              <MenuItem value="AB+">AB +</MenuItem>
              <MenuItem value="AB-">AB -</MenuItem>
              <MenuItem value="O+">O +</MenuItem>
              <MenuItem value="O-">O -</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            required
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classStyles.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              type="reset"
              className={classStyles.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    dCandidateList: state.dCandidate.list,
  };
};

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(DCandidateForm);
