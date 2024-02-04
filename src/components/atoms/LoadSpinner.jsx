import { Spinner } from "@chakra-ui/react"

export default function LoadSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size={'xl'} thickness="5px" />
    </div>
  )
}
