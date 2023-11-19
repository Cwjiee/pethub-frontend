import { useRouter } from "next/router"

export default function ReportDetails() {
  const router = useRouter()
  const id = router.query.id

  return (
    <>
    <div>Hello {id}</div>
    </>
  )
}
