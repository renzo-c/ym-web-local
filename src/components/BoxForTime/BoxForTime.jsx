import React, { Component } from "react";

class BoxForTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspan: {
                hours: "",
                minutes: ""
            }
        }
        this.handleHours = this.handleHours.bind(this);
        this.handleMinutes = this.handleMinutes.bind(this);
    }
    handleHours(event) {
        event.preventDefault();
        let hours = event.target.value;
        let workspan = this.state.workspan;
        workspan["hours"] = hours;
        this.setState({workspan});
    }
    handleMinutes(event) {
        event.preventDefault();
        let minutes = event.target.value;
        let workspan = this.state.workspan;
        workspan["minutes"] = minutes;
        this.setState({workspan});
    }
  render() {
    return (
      <div>
        <div>
          <label>Horas (1-24):</label>
          <input type="number" id="hours" name="hours" min="1" max="24" onChange={this.handleHours}/>
        </div>
        <div>
          <label>Minutos (1-60):</label>
          <input type="number" id="minutes" name="minutes" min="1" max="60" onChange={this.handleMinutes}/>
        </div>
      </div>
    );
  }
}

export default BoxForTime;