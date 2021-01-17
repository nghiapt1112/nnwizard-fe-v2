// Specify default date formatting for language (locale)
export const toDateString = (timeStamp) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(timeStamp));
};
