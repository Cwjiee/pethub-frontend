import { useEffect, useState } from "react"

export default function ReportInfo({ report }) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const splitDateTime = (datetimeString) => {
      const dateTime = new Date(datetimeString);

      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const seconds = dateTime.getSeconds();

      const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

      const period = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

      const formattedTime = `${formattedHours < 10 ? '0' : ''}${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}${period}`;

      setDate(formattedDate);
      setTime(formattedTime);
    }
    splitDateTime(report.created_at)
  }, [])

  return (
    <div className="p-10 flex flex-col justify-around items-start bg-white w-2/5 m-auto rounded-[10px] gap-8 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]">
      <div>
        <div className="font-semibold">Report Title:</div>
        <span>{report.report_title}</span>
      </div>
      <div>
        <div className="font-semibold">Report Description:</div>
        <span>{report.report_description}</span>
      </div>
      <div>
        <div className="font-semibold">Full Name:</div>
        <span>{report.user.full_name}</span>
      </div>
      <div>
        <div className="font-semibold">Time Reported:</div>
        <span>{time}</span>
      </div>
      <div>
        <div className="font-semibold">Date reported:</div>
        <span>{date}</span>
      </div>
    </div>
  )
}
