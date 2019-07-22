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

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/parkeo/admin-page"
          color="transparent"
          target=""
          className={classes.navLink}
        >
          Administración
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="¿Nuestros Servicios?"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/#Parkeo" className={classes.dropdownLink}>
              Parkeo
            </Link>,
            <Link to="/#GestionP" className={classes.dropdownLink}>
              GestiónP
            </Link>,
            <Link to="/#EcoSpa" className={classes.dropdownLink}>
              EcoSpa!
            </Link>,
            <Link to="/#ChoferDeReemplazo" className={classes.dropdownLink}>
              Chofer de Reemplazo
            </Link>,
            <Link to="/#Chofer24" className={classes.dropdownLink}>
              Chofer24
            </Link>,
            <Link to="/#AlTaller" className={classes.dropdownLink}>
              Al Taller
            </Link>,
            <Link to="/#Recepcionista" className={classes.dropdownLink}>
              Recepcionista
            </Link>,
            <Link to="/#Seguridad" className={classes.dropdownLink}>
              Seguridad
            </Link>,
            <Link to="/#TGuio" className={classes.dropdownLink}>
              TGuio
            </Link>
          ]}
        />
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Síguenos en twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href=""
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
        <Tooltip
          id="instagram-facebook"
          title="Síguenos en facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href=""
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
        <Tooltip
          id="instagram-tooltip"
          title="Síguenos en instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href=""
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
