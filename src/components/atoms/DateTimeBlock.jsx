import { useState, useEffect } from "react";

export default function DateTimeBlock({ datetimeString }) {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const splitDateTime = (datetimeString) => {
    const dateTime = new Date(datetimeString);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

    // Format time to 12-hour format with "am" or "pm"
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedTime = `${formattedHours < 10 ? '0' : ''}${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}${period}`;

    // Update state
    setDate(formattedDate);
    setTime(formattedTime);
  };

  useEffect(() => {
    splitDateTime(datetimeString);
  }, [datetimeString]);

  return (
    <>
      <div className="text-[#4E4E4E] text-[12px]">{date}</div>
      <div className="text-[#4E4E4E] text-[12px]">{time}</div>
    </>
  )
}
