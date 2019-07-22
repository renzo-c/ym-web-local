/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { HashLink as Link } from "react-router-hash-link";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import ChipAdmin from "../Chip/ChipAdmin";

function HeaderLinks({ ...props }) {
  const { classes, onClick } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => onClick("employees")}
          color="transparent"
          target=""
          className={classes.navLink}
        >
          EMPLEADOS
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => onClick("branches")}
          color="transparent"
          target=""
          className={classes.navLink}
        >
          SEDES
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => onClick("serviceshifts")}
          color="transparent"
          target=""
          className={classes.navLink}
        >
          HORARIOS
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => onClick("attendance")}
          color="transparent"
          target=""
          className={classes.navLink}
        >
          INICIO DE TURNOS
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => onClick("parkings")}
          color="transparent"
          target=""
          className={classes.navLink}
        >
          AUTOS REGISTRADOS
        </Button>
      </ListItem>
      <ChipAdmin history={props.history} />
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
