export function validateDateInput(startDate, endDate) {
  startDate = Date.parse(startDate);
  endDate = Date.parse(endDate);
  if (Object.is(startDate, NaN)) {
    return "Invalid Start Date";
  } else if (Object.is(endDate, NaN)) {
    return "Invalid End Date";
  } else if (endDate < startDate) {
    return "End Date Can Not Be Less Than Start Date"
  }
  return "";
}
