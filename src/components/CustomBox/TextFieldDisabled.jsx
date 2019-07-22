import React from "react";
import TextField from "@material-ui/core/TextField";

class TextFields extends React.Component {
  render() {
    const { n } = this.props;
    return (
      <TextField
        disabled
        label="Nombre"
        defaultValue={n}
        margin="normal"
        fullWidth
      />
    );
  }
}

export default TextFields;
