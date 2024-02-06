export default function TimeConvert( openingHour, closingHour ) {

  console.log(openingHour)
  const splitDateTime = (timeString) => {
    let [hours, minutes, seconds] = timeString.split(':')
    hours = parseInt(hours)
    minutes = parseInt(minutes)

    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours < 10 ? '0' : ''}${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}${period}`;
  };

  console.log(openingHour)
  const openTime = splitDateTime(openingHour)
  const closeTime = splitDateTime(closingHour)

  return {
    openTime,
    closeTime
  }
}
