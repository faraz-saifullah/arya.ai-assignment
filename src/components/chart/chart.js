import React, { Fragment, Component } from 'react';
import { Redirect } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import CanvasJSReact from './assets/canvasjs.react';
import withContext from "../../withContext";
import Helper from "./helper"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2017-02-01',
      endDate: '2020-05-01',
    }
    this.helper = new Helper();
  }

  onFormInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Expenses Per Month"
      },
      axisX: {
        valueFormatString: "MMM-YYYY",
      },
      axisY: {
        title: "Expenses (in 1000 USD)",
        prefix: "$",
        includeZero: false
      },
      data: [{
        yValueFormatString: "$#,###",
        xValueFormatString: "MMM",
        type: "spline",
        dataPoints: this.helper.prepareOptions(this.state.startDate, this.state.endDate).accept
      },
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMM",
        type: "spline",
        dataPoints: this.helper.prepareOptions(this.state.startDate, this.state.endDate).error
      },
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMM",
        type: "spline",
        dataPoints: this.helper.prepareOptions(this.state.startDate, this.state.endDate).reject
      }]
    }

    const { user } = this.props.context;
    return (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Your Chart</h4>
          </div>
        </div>
        <br />
        <center>
          <form onSubmit={this.handleSubmit}>
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="startDate">Start Date</InputLabel>
              <Input
                value={this.state.startDate}
                onChange={this.onFormInputChange}
                id="startDate"
              />
            </FormControl>
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="endDate">End Date</InputLabel>
              <Input
                value={this.state.endDate}
                onChange={this.onFormInputChange}
                id="endDate"
              />
            </FormControl>
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <br />
            <br />
          </form>
        </center>
        <br />
        <CanvasJSChart options={options} />
      </Fragment>
    )
  }
}

export default withContext(SplineChart);                         