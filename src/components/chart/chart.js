import React, { Fragment, Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import CanvasJSReact from "./assets/canvasjs.react";
import withContext from "../../withContext";
import Helper from "./helper";
import { validateDateInput } from "./Validation"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
  constructor(props) {
    super(props);
    this.helper = new Helper();
    this.state = {
      startDate: "",
      endDate: "",
      options: {},
      error: "",
    };
  }

  onFormInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  updateOptions = (event) => {
    event.preventDefault();
    const validationError = validateDateInput(this.state.startDate, this.state.endDate);
    if (!validationError) {
      const options = this.helper.getOptions(
        Date.parse(this.state.startDate),
        Date.parse(this.state.endDate)
      );
      this.setState({
        options: options,
      });
    } else {
      this.setState({
        error: validationError
      })
    }
  };

  componentDidMount() {
    const temp = this.helper.getInitialOptions();
    this.setState({
      options: temp,
    });
  }

  render() {
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
            <br />
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <br />
            <button
              onClick={this.updateOptions}
              type="submit"
              className="button is-primary is-medium"
            >
              Update
            </button>
          </form>
        </center>
        <br />
        <CanvasJSChart options={this.state.options} />
      </Fragment>
    );
  }
}

export default withContext(SplineChart);
