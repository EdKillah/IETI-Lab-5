import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {  Link, withRouter } from "react-router-dom";

import "./styles/Login.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #8360c3 30%, #2ebf91 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("username", "Eduard Jimenez");
    localStorage.setItem("email", "edkillah@mail.com");
    localStorage.setItem("pwd", "654321");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("email");
    const pwd = localStorage.getItem("pwd");

    if (email === user && password === pwd) {
      localStorage.setItem("isLoggedIn", true);
      props.handleLoggin(true);
      props.history.push("/index");
    } else {
      localStorage.setItem("isLoggedIn", false);
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className="layout">
        <Paper className="paper">
          <Avatar className="avatar">
            <LockIcon />
          </Avatar>{" "}
          <Typography variant="h2"> Sign in </Typography>{" "}
          <form onSubmit={handleSubmit} className="form">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email"> Email Address </InputLabel>{" "}
              <Input
                id="email"
                name="email"
                autoComplete="email"
                placeholder="pepe@mail.com"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />{" "}
            </FormControl>{" "}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password"> Password </InputLabel>{" "}
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="******"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />{" "}
            </FormControl>{" "}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.root}
            >
              Sign in
            </Button>{" "}
          </form>{" "}
          <Link to="/singup">
            <a href="/singup"> Create an account </a>{" "}
          </Link>{" "}
        </Paper>{" "}
      </main>{" "}
    </React.Fragment>
  );
};

export default withRouter(Login);
