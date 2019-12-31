/**
 * @return {string}
 */
export const timeFormat = function(value) {
  let seconds = value % 60;
  let branch = Math.floor(value / 60);
  let hour = Math.floor(branch / 60);
  branch >= 60 ? (branch %= 60) : branch;
  if (value < 60) {
    seconds = ("0" + value).slice(-2);
    return "00:" + seconds;
  }
  let result = "";
  if (hour > 0) {
    result += hour + ":";
  }
  if (branch > 0) {
    branch = ("0" + branch).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    result += branch + ":" + seconds;
  }
  return result;
};
