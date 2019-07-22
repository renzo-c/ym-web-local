import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// import { NavHashLink as NavLink } from "react-router-hash-link";

// @material-ui/icons
// import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Fingerprint from "@material-ui/icons/Fingerprint";
import Star from "@material-ui/icons/Star";
import Person from "@material-ui/icons/Person";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";

// import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

// import somosTitle from "assets/img/about/somos_title.png";
// import somosImg from "assets/img/about/somos_img.png";
// import valoramosTitle from "assets/img/about/valoramos_title.png";
// import valoramosImg from "assets/img/about/valoramos_img.png";

class AboutSection extends React.Component {
  render() {
    const { classes } = this.props;
    // const imageClasses = classNames(classes.imgFluid);
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>
              ParKeo es un servicio profesional de valet parking.
            </h2>
            <h5 className={classes.description}>
              El compromiso de ParKeo es brindarle el mejor servicio a sus
              clientes o invitados durante la recepción, custodia, resguardo y
              entrega de sus autos. Para garantizarlo nos regimos bajo las
              siguientes políticas de calidad y procesos de mejora continua:
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Personal"
                description="Personal capacitado y preparado para brindarle una atención eficaz, rápida y de
                calidad"
                icon={Person}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Seguridad"
                description="Se entregará al usuario del auto un pin autorizado que lo identifica como propietario,
                para la guarda, custodia y entrega respectiva"
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Excelencia"
                description="Nuestro personal esta debidamente uniformado y con fotocheck que lo identifica como
                personal de ParKeo"
                icon={Star}
                iconColor="warning"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(AboutSection);
