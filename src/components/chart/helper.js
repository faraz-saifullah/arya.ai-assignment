import data from '../../arya-ai-data.json';


export default class Helper {
  constructor() {
    this.data = data.sort(function (a, b) {
      return a.Date > b.Date ? 1 : -1;
    })
  }

  getBoundries = () => {
    let startDate = new Date(this.data[0].Date).toISOString();
    let endDate = new Date(this.data[data.length - 1].Date).toISOString();
    startDate = startDate.split('T')[0]
    endDate = endDate.split('T')[0]
    return {
      startDate,
      endDate
    }
  }

  normalize(data) {
    let accept = [];
    let reject = [];
    let error = [];
    data.map((item) => {
      let graphData = {};
      let month = new Date(item.Date).getUTCMonth() + 1;
      let year = new Date(item.Date).getUTCFullYear();
      graphData.x = new Date(year, month);
      graphData.y = item.Amount / 1000;
      if (item.Decision === 'ACCEPT') {
        if (accept.length - 1 > -1 && Date.parse(accept[accept.length - 1].x) === Date.parse(graphData.x)) {
          accept[accept.length - 1].y += graphData.y;
        } else {
          accept.push(graphData);
        }
      } else if (item.Decision === 'ERR') {
        if (error.length - 1 > -1 && Date.parse(error[error.length - 1].x) === Date.parse(graphData.x)) {
          error[error.length - 1].y += graphData.y;
        } else {
          error.push(graphData);
        }
      } else if (item.Decision === 'REJECT') {
        if (reject.length - 1 > -1 && Date.parse(reject[reject.length - 1].x) === Date.parse(graphData.x)) {
          reject[reject.length - 1].y += graphData.y;
        } else {
          reject.push(graphData);
        }
      }
    })
    return {
      accept,
      error,
      reject
    };
  }

  prepareOptions(startDate, endDate) {
    startDate = Date.parse(startDate);
    endDate = Date.parse(endDate);
    // console.log(new Date(endDate - startDate));
    let reqData = []
    //TODO: use binary search
    this.data.forEach(item => {
      if (item.Date >= startDate && item.Date <= endDate) {
        reqData.push(item);
      }
    });
    return this.normalize(reqData);
  }
}
