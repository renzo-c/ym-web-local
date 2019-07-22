import React from "react";
import TextField from "@material-ui/core/TextField";
// Helper functions
import { modalDateTimeToLocalTime } from "assets/helperFunctions/index.js";

class DateAndTimePickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentWillMount() {
    let value = modalDateTimeToLocalTime(this.props.value);
    value = value.format.db;
    this.setState({value});
  }

  componentWillReceiveProps(nextProps) {
    let value = modalDateTimeToLocalTime(nextProps.value);
    value = value.format.db;
    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <TextField
        id="datetime-local"
        type="datetime-local"
        value={value}
        onChange={this.props.onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}

export default DateAndTimePickers;
