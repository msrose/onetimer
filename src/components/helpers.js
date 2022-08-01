export const formatDate = timestamp => {
  const date = new Date(timestamp);
  const dateString = date.toDateString();
  let timeString = date.toTimeString();
  timeString = timeString.slice(0, timeString.indexOf(' '));
  return `${dateString} ${timeString}`;
};

export const formatTime = (value, { showSubSecond = true } = {}) => {
  const ms = String(value % 1000).padStart(3, '0');
  value = Math.floor(value / 1000);
  let sec = String(value % 60);
  value = Math.floor(value / 60);
  let min = String(value % 60);
  value = Math.floor(value / 60);
  const hours = String(value);
  if(min > 0 || hours > 0) sec = sec.padStart(2, '0');
  if(hours > 0) min = min.padStart(2, '0');
  return (hours > 0 ? `${hours}:` : '') +
    (min > 0 || hours > 0 ? `${min}:` : '') + sec + (showSubSecond ? `.${ms}` : '');
};

export const classname = classnameObject => {
  return Object.entries(classnameObject).reduce((finalClassName, [className, test]) => {
    return finalClassName + (test ? ' ' + className : '');
  }, '').trim();
};
