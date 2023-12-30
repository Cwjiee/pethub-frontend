export default function ReportInfo({ report }) {
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
        <span></span>
      </div>
      <div>
        <div className="font-semibold">Report Title:</div>
        <span></span>
      </div>
    </div>
  )
}
