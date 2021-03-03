import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    background: "linear-gradient(45deg, #8360c3 30%, #2ebf91 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  secondary: {
    background: "linear-gradient(45deg, #da4453 30%, #89216b 90%)",
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  //const [open, setOpen] = React.useState(false);
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = dueDate ? dueDate.toDateString() : "";
    const filter = { status, dueDate: date, responsible };
    props.filterTask(filter);
  };

  const clearAll = () => {
    setStatus("");
    setResponsible("");
    setDueDate("");
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">TASK FILTERS</h2>
      <form onSubmit={handleSubmit} className="form">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Due Date</InputLabel>
          <DatePicker
            id="due-date"
            selected={dueDate}
            placeholderText="Due date"
            onChange={(date) => setDueDate(date)}
          ></DatePicker>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="responsible"> Responsible </InputLabel>
          <Input
            name="responsible"
            type="text"
            id="responsible"
            placeholder="Pepe"
            onChange={(event) => setResponsible(event.target.value)}
            value={responsible}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <MenuItem value={"ready"}>Ready</MenuItem>
            <MenuItem value={"in_progress"}>In Progress</MenuItem>
            <MenuItem value={"completed"}>Done</MenuItem>
          </Select>
        </FormControl>
        <p />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.root}
        >
          Apply
        </Button>
        <p />
        <Button
          onClick={clearAll}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.secondary}
        >
          Clear All
        </Button>
        <p id="simple-modal-description">
          To see all tasks click on "Clear All" and next in "Apply"
        </p>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.handleOpen}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
