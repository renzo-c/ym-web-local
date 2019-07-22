import GeneralViewStyle from "assets/jss/material-kit-react/views/GeneralViewStyle.jsx";

const employeePageStyle = {
  ...GeneralViewStyle,
  flexParent: {
    marginTop: "5%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  flexChild: {
    flex: "1 1 50%",
    alignItems: "center",
    justifyContent: "center"
  },
  flexTable: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "space-around"
  },
  alignNewDiv: {
    display: "flex",
    margin: "0 0 0px 0",
    alignContent: "space-around"
  },
  pageNumbers: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  liOfpageNumbers: {
    marginRight: "0.3em",
    color: "blue",
    userSelect: "none",
    cursor: "pointer"
  }
};

export default employeePageStyle;
