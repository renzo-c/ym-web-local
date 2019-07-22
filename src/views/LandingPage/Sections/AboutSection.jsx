import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// import { NavHashLink as NavLink } from "react-router-hash-link";

// @material-ui/icons
// import Chat from "@material-ui/icons/Chat";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Fingerprint from "@material-ui/icons/Fingerprint";
// import Grade from "@material-ui/icons/Grade";
// import Person from "@material-ui/icons/Person";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import somosTitle from "assets/img/about/somos_title.png";
import somosImg from "assets/img/about/somos_img.png";
import valoramosTitle from "assets/img/about/valoramos_title.png";
import valoramosImg from "assets/img/about/valoramos_img.png";

class AboutSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(classes.imgFluid);
    return (
      <div className={classes.section} id="About">
        <GridContainer justify="center">
          <GridItem xs={16} sm={16} md={8}>
            <h2 className={classes.title}>Pasión por los detalles</h2>
            <h5 className={classes.description}>
              Dejamos huella que transmite confianza y fidelización.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={16} sm={16} md={6}>
              <Card plain>
                <CardBody>
                  <img src={somosTitle} alt="..." className={imageClasses} />
                  <p> </p>
                  <p className={classes.description}>
                    Jóvenes emprendedores que valoramos y disfrutamos de lo que
                    hacemos, brindando servicios de calidad que tu negocio y
                    clientes necesitan, trabajando con pasión, innovación y
                    tecnología.
                  </p>
                  <img src={somosImg} alt="..." className={imageClasses} />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={16} sm={16} md={6}>
              <Card plain>
                <CardBody>
                  <img src={valoramosImg} alt="..." className={imageClasses} />
                  <p> </p>
                  <img
                    src={valoramosTitle}
                    alt="..."
                    className={imageClasses}
                  />
                  <p> </p>
                  <p className={classes.description}>
                    La buena atención, por ello nuestra propuesta es resaltar la
                    imagen de tu marca, trabajando en fortalecer tu prestigio
                    con detalles que maximizan la experiencia de los clientes.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(AboutSection);
