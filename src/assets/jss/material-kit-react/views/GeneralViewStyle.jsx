const GeneralViewStyle = {
    flexContainerNew: {
      display: "flex",
      flexDirection: "row",
      verticalAlign: "center",
      flexFlow: "row wrap",
      justifyContent: "left",
      alignItems: "center"
    },
    MarginContainer: {
      marginTop: "5%"
    },
    tr: {
      textAlign: "center",
      borderTop: "1px solid #b1b1b1",
      borderBottom: "1px solid #b1b1b1",
      "&:hover": {
        backgroundColor: "#dcdcdc"
      }
    },
    td: {
      padding: "1%"
    },
    flexContainerActions: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      alignItems: "center"
    },
    isDisabled: {
      color: "currentColor",
      cursor: "not-allowed",
      opacity: "0.5",
      textDecoration: "none",
      pointerEvents: "none"
    }
  };
  
  export default GeneralViewStyle;
  