import { useRouter } from "next/router"

export default function NewsDetails() {
  const router = useRouter()
  const id = router.query.id

  return (
    <>
      <div>hello {id}</div>
    </>
  )
}
