import { Avatar } from "@chakra-ui/react"
import DateTimeBlock from "../atoms/DateTimeBlock"

export default function CommentBlock({ name, date, desc }) {
  return (
    <div className="p px-4 border border-[#E0E0E0] rounded-[10px]">
      <div className="flex flex-row my-5 gap-2">
        <div className="flex justify-center items-center"><Avatar colorScheme="blue" size="sm" name={name}/></div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-left items-center gap-2">
            <div>{name}</div>
            <DateTimeBlock datetimeString={date}/>
          </div>
          <div className="text-[#4E4E4E] text-[14px]">{desc}</div>
        </div>
      </div>
    </div>
  )
}
