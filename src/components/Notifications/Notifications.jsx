import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import notificationsStyles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.jsx";

class SectionNotifications extends React.Component {
  render() {
    const { classes } = this.props;
    const { errorList /*, success*/ } = this.props;
    return (
      <div className={classes.section} id="notifications">
        {errorList
          ? errorList.map((error, index) => {
              return (
                <Snackbar
                  key={index}
                  errorMessage={error}
                  clearErrorList={this.props.clearErrorList}
                />
              );
            })
          : null}
        <Clearfix />
      </div>
    );
  }
}

export default withStyles(notificationsStyles)(SectionNotifications);
