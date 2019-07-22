import React from "react";
// nodejs library to set properties for components
// @material-ui/core components
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Snack from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import snackbarContentStyle from "assets/jss/material-kit-react/components/snackbarContentStyle.jsx";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

class SnackbarContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    };
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    const { classes, message, color, close, icon } = this.props;
    var action = [];
    if (close !== undefined) {
      action = [
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.closeAlert}
        >
          <Close className={classes.close} />
        </IconButton>
      ];
    }

    let snackIcon = null;
    switch (typeof icon) {
      case "function":
        snackIcon = <props.icon className={classes.icon} />;
        break;
      case "string":
        snackIcon = <Icon className={classes.icon}>{this.props.icon}</Icon>;
        break;
      default:
        snackIcon = null;
        break;
    }

    this.setState({
      alert: (
        <Snack
          message={
            <div>
              {snackIcon}
              {message}
              {close !== undefined ? action : null}
            </div>
          }
          classes={{
            root: classes.root + " " + classes[color],
            message: classes.message + " " + classes.container
          }}
        />
      )
    });
  }
  closeAlert() {
    this.setState({ alert: null });
  }

  render() {
    // console.log("this.state.close", this.state.close);
    // console.log("this.state.alert", this.state.alert);
    // console.log("this.props.message", this.props.message.props.children.length);
    return this.state.alert;
  }
}

export default withStyles(snackbarContentStyle)(SnackbarContent);

// class SnackbarContent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.closeAlert = this.closeAlert.bind(this);
//     const { classes, message, color, close, icon } = props;
//     var action = [];
//     if (close !== undefined) {
//       action = [
//         <IconButton
//           className={classes.iconButton}
//           key="close"
//           aria-label="Close"
//           color="inherit"
//           onClick={this.closeAlert}
//         >
//           <Close className={classes.close} />
//         </IconButton>
//       ];
//     }

//     let snackIcon = null;
//     switch (typeof icon) {
//       case "function":
//         snackIcon = <props.icon className={classes.icon} />;
//         break;
//       case "string":
//         snackIcon = <Icon className={classes.icon}>{props.icon}</Icon>;
//         break;
//       default:
//         snackIcon = null;
//         break;
//     }

//     this.state = {
//       alert: (
//         <Snack
//           message={
//             <div>
//               {snackIcon}
//               {message}
//               {close !== undefined ? action : null}
//             </div>
//           }
//           classes={{
//             root: classes.root + " " + classes[color],
//             message: classes.message + " " + classes.container
//           }}
//         />
//       )
//     };
//   }
//   closeAlert() {
//     this.setState({ alert: null });
//   }
//   render() {
//     console.log("this.props", this.props);
//     console.log("this.state.alert", this.state.alert);
//     return this.state.alert;
//   }
// }

// SnackbarContent.propTypes = {
//   classes: PropTypes.object.isRequired,
//   message: PropTypes.node.isRequired,
//   color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
//   close: PropTypes.bool,
//   icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
// };

// export default withStyles(snackbarContentStyle)(SnackbarContent);
