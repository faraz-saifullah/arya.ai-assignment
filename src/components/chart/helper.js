import JsonData from "../../arya-ai-data.json";

const data = JsonData.sort(function (a, b) {
  return a.Date > b.Date ? 1 : -1;
});

const options = {
  animationEnabled: true,
  title: {
    text: "Expenses Per Month",
  },
  axisX: {
    interval: 1,
    intervalType: "day",
    valueFormatString: "DD-MMM-YYYY",
  },
  axisY: {
    title: "Expenses (in 1000 USD)",
    prefix: "$",
    includeZero: false,
  },
  data: [
    {
      yValueFormatString: "$#,###",
      xValueFormatString: "DD-MMM",
      type: "spline",
      dataPoints: [],
    },
    {
      yValueFormatString: "$#,###",
      xValueFormatString: "DD-MMM",
      type: "spline",
      dataPoints: [],
    },
    {
      yValueFormatString: "$#,###",
      xValueFormatString: "DD-MMM",
      type: "spline",
      dataPoints: [],
    },
  ],
};

export default class Helper {
  getDataPoints = (data, type) => {
    let accept = [];
    let reject = [];
    let error = [];
    for (let i = 0; i < data.length; i++) {
      let dataPoint = {};
      let day = new Date(data[i].Date).getDate();
      let month = new Date(data[i].Date).getMonth();
      let year = new Date(data[i].Date).getFullYear();
      if (type === "monthly") {
        dataPoint.x = new Date(year, month, 1);
      } else if (type === "daily") {
        dataPoint.x = new Date(year, month, day);
      } else {
        dataPoint.x = new Date(year, month, day);
      }
      dataPoint.y = data[i].Amount / 1000;
      if (data[i].Decision === "ACCEPT") {
        if (
          accept.length > 0 &&
          Date.parse(accept[accept.length - 1].x) === Date.parse(dataPoint.x)
        ) {
          accept[accept.length - 1].y += dataPoint.y;
        } else {
          accept.push(dataPoint);
        }
      } else if (data[i].Decision === "REJECT") {
        if (
          reject.length > 0 &&
          Date.parse(reject[reject.length - 1].x) === Date.parse(dataPoint.x)
        ) {
          reject[reject.length - 1].y += dataPoint.y;
        } else {
          reject.push(dataPoint);
        }
      } else {
        if (
          error.length > 0 &&
          Date.parse(error[error.length - 1].x) === Date.parse(dataPoint.x)
        ) {
          error[error.length - 1].y += dataPoint.y;
        } else {
          error.push(dataPoint);
        }
      }
    }
    options.data[0].dataPoints = accept;
    options.data[1].dataPoints = reject;
    options.data[2].dataPoints = error;
  };

  prepareOptions = (startDate, endDate) => {
    let difference = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    let relevantData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].Date >= startDate && data[i].Date <= endDate) {
        relevantData.push(data[i]);
      }
    }
    options.axisX.intervalType = "day";
    options.axisX.interval = 1;
    options.axisX.valueFormatString = "DD-MMM-YYYY";
    options.data[0].xValueFormatString = "DD-MMM";
    options.data[1].xValueFormatString = "DD-MMM";
    options.data[2].xValueFormatString = "DD-MMM";
    if (difference <= 7) {
      this.getDataPoints(relevantData, "daily");
    } else if (difference > 7 && difference <= 90) {
      options.axisX.interval = 7;
      this.getDataPoints(relevantData, "weekly");
    } else if (difference > 90) {
      console.log("in");
      options.axisX.intervalType = "month";
      options.axisX.valueFormatString = "MMM-YYYY";
      options.data[0].xValueFormatString = "MMM";
      options.data[1].xValueFormatString = "MMM";
      options.data[2].xValueFormatString = "MMM";
      this.getDataPoints(relevantData, "monthly");
    }
  };

  getInitialOptions = () => {
    let startDate = data[0].Date;
    let endDate = data[data.length - 1].Date;
    this.prepareOptions(startDate, endDate);
    return options;
  };

  getOptions = (startDate, endDate) => {
    this.prepareOptions(startDate, endDate);
    return options;
  };
}
