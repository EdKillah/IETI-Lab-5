import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import addImg from "../images/save.png";
import "./styles/AddPage.css";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #8360c3 30%, #2ebf91 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewTask = (props) => {
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("Ready");
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("username", "edkillah");
    localStorage.setItem("pwd", "654321");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();           
    const contact = {name: responsible, email:'eduard@mail.com'};
    props.submitTask({description,responsible: contact, status, dueDate:dueDate.toDateString()});
    props.history.push("/index");
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className="layout">
        <Paper className="paper">
          <Avatar className="avatar">
            <LockIcon />
          </Avatar>
          <Typography variant="h2"> New Task </Typography>{" "}
          <form onSubmit={handleSubmit} className="form">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email"> Description </InputLabel>{" "}
              <Input
                id="description"
                name="description"
                autoComplete="description"
                placeholder="Add your task here"
                autoFocus
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />{" "}
            </FormControl>{" "}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="responsible"> Responsible </InputLabel>{" "}
              <Input
                name="responsible"
                type="text"
                id="responsible"
                placeholder="Pepe"                
                onChange={(event) => setResponsible(event.target.value)}
                value={responsible}
              />{" "}
            </FormControl>{" "}
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value={"ready"}>Ready</MenuItem>
                <MenuItem value={"in_progress"}>In Progress</MenuItem>
                <MenuItem value={"completed"}>Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Due Date</InputLabel>
              <DatePicker
                id="due-date"
                selected={dueDate}
                minDate={new Date()}
                placeholderText="Due date"
                onChange={(date) => setDueDate(date)} 
              ></DatePicker>
            </FormControl>
            <Button  type="submit" onClick={() => handleSubmit} className="container Fitness-Add">
              <img src={addImg} alt="" />
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withRouter(NewTask);
