import React from "react";
import clsx from "clsx";
import "./styles/Fondo.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function TemporaryDrawer(props) {  
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const handleClick = () => {
    props.history.push("/singup");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    const userProps = props.userProperties;
    const user = {
      name: userProps.username,
      email: userProps.email,
      pwd: userProps.pwd,
    };
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Avatar className="avatar">
            <PersonIcon />
          </Avatar>{" "}
          <ListItemText primary={user.name + "\n" + user.email} />{" "}
        </div>{" "}
        <ListItem
          button
          onClick={handleClick}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ListItemIcon style={{ marginLeft: "0px" }}>
            <EditIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem
          button
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "0px",
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>{" "}
          <ListItemText primary="Logout" />
        </ListItem>{" "}
      </div>
    );
  };

  const selected = "left";
  return (
    <div>
      <React.Fragment key={selected}>
        <Button onClick={toggleDrawer(selected, true)}>
          <FormatListBulletedIcon />
        </Button>{" "}
        <Drawer
          anchor={selected}
          open={state[selected]}
          onClose={toggleDrawer(selected, false)}
        >
          {" "}
          {list(selected)}{" "}
        </Drawer>{" "}
      </React.Fragment>{" "}
    </div>
  );
}

export default withRouter(TemporaryDrawer);
