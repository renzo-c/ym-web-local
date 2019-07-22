import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import HeaderLinksParkeo from "components/Header/HeaderLinksParkeo.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// import { HashLink as Link } from "react-router-hash-link";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
// import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

// Sections for this page
import AboutSection from "./Sections/AboutSection.jsx";
// import ServicesSection from "./Sections/ServicesSection.jsx";
// import WorkSection from "./Sections/WorkSection.jsx";
import ClientsSection from "./Sections/ClientsSection.jsx";
import PartnersSection from "./Sections/PartnersSection";

const dashboardRoutes = [];

class ParkeoPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(classes.imgCenter);
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          rightLinks={<HeaderLinksParkeo />}
          brand="Parkeo.com"
          fixed
          changeColorOnScroll={{
            height: 300,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/profile-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <Card plain>
                  <CardBody>
                    <img
                      src={require("assets/img/logos/Parkeo2.png")}
                      alt="..."
                      className={imageClasses}
                    />
                    <h3 className={classes.title}>
                      Cuidamos tu auto tanto como tu
                    </h3>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <AboutSection />
            {/* <ServicesSection /> */}
            <PartnersSection />
            <ClientsSection />
            {/* <WorkSection /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(ParkeoPage);
