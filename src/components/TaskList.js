import React from "react";
import TemporaryDrawer from "./TemporaryDrawer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SimpleModal from "./Modal";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    const status = {
      completed: "check",
      ready: "alarm_on",
      in_progress: "query_builder",
    };
    this.state = { todos: props.todos, status, open: false, todosCopy: [] };
  }

  componentDidMount() {
    this.initTodos();
  }

  initTodos = () => {
    this.setState((state, props) => ({
      todosCopy: [...state.todos],
    }));
  };

  compareNames = (resp, responsible) => {
    return resp.name.toLowerCase().indexOf(responsible.toLowerCase()) > -1;
  };

  filterLogic = (temp, status, responsible, dueDate) => {
    var res = [];
    temp.forEach((item) => {
      const stat = item.status;
      const resp = item.responsible;
      const date = item.dueDate;
      if (status !== "" && responsible !== "" && dueDate !== "") {
        if (
          stat === status &&
          this.compareNames(resp, responsible) &&
          date === dueDate
        )
          res.push(item);
      } else if (status === "" && responsible === "") {
        if (date === dueDate) res.push(item);
      } else if (responsible === "" && dueDate === "") {
        if (stat === status) res.push(item);
      } else if (status === "" && dueDate === "") {
        if (this.compareNames(resp, responsible)) res.push(item);
      } else if (dueDate === "") {
        if (stat === status && this.compareNames(resp, responsible))
          res.push(item);
      } else if (status === "") {
        if (this.compareNames(resp, responsible) && date === dueDate)
          res.push(item);
      } else if (responsible === "") {
        if (stat === status && date === dueDate) res.push(item);
      }
    });
    return res;
  };

  filterTask = (filter) => {
    const { responsible, status, dueDate } = filter;
    if (status === "" && responsible === "" && dueDate === "") {
      this.initTodos();
    } else {
      const temp = [...this.state.todos];
      var filtro = [];
      filtro = this.filterLogic(temp, status, responsible, dueDate);
      console.log("Filtro: ",filtro);
      this.setState({ todosCopy: [...filtro] });
    }
  };

  handleClick = () => {
    return this.props.history.push("/newtask");
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const style = {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
      background: "linear-gradient(45deg, #396afc 90%, #2948ff 30%)",
    };
    const style2 = {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 80,
      left: "auto",
      position: "fixed",
    };
    const userProperties = {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      pwd: localStorage.getItem("pwd"),
    };
    return (
      <div>
        <TemporaryDrawer userProperties={userProperties} />{" "}
        {this.state.todosCopy.map((todo, index) => {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  marginBottom: "12px",
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {todo.description}
                  </Typography>
                  <Typography color="textSecondary">
                    Name: {todo.responsible.name}
                  </Typography>{" "}
                  <Typography color="textSecondary">
                    Email: {todo.responsible.email}
                  </Typography>{" "}
                  <Typography color="secondary">
                    Status: {todo.status + " "}
                    <Icon> {this.state.status[todo.status]} </Icon>{" "}
                  </Typography>{" "}
                  <Typography> Date: {todo.dueDate} </Typography>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </div>
          );
        })}
        <Fab
          color="secondary"
          aria-label="edit"
          onClick={() => this.handleOpen()}
          style={style2}
        >
          <EditIcon />
        </Fab>
        <SimpleModal
          handleOpen={this.state.open}
          handleClose={() => this.handleClose()}
          filterTask={this.filterTask}
        />
        <Fab
          color="primary"
          aria-label="add"
          style={style}
          onClick={this.handleClick}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withRouter(TaskList);
