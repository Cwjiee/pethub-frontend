import { useToast } from "@chakra-ui/react"
import Link from "next/link"
import { v4 } from "uuid"

export default function NewsTable({ news, token, setReloadNews }) {
  const toast = useToast()

  const handleSubmit = async (application, newsId) => {
    
    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL

    const response = await fetch(`${url}/news_application/${newsId}`, {
      method: "PUT",
      body: JSON.stringify({
        news_status: application,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    const result = await response.json()
    console.log(result)

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'news status updated',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setReloadNews(true)
    } else {
      toast({
        title: 'Error',
        description: 'Failed in updating news status',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <section class="sm:py-5 antialiased">
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">News Title</th>
                            <th scope="col" class="px-4 py-4">Made By</th>
                            <th scope="col" class="px-4 py-4">Category</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">More Details</span>
                            </th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Approve and Reject</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {news.map((news) => {
                        return (
                          <tr class="border-b dark:border-gray-700" key={news.news_id}>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{news.news_title}</th>
                            <td class="px-4 py-3 max-w-[12rem] truncate">{news.user.full_name}</td>
                            <td class="px-4 py-3">
                              {news.categories.map((category) => {
                                return <span key={v4()}>{category.category_name}</span>
                              })}
                            </td>
                            <td class="px-4 py-3 justify-start">
                              <Link href={`./news/${news.news_id}`} className="text-[#0055D4] underline">
                                More Details
                              </Link>
                            </td>
                            <td class="px-4 py-3 flex flex-row gap-x-2 justify-end">
                              <button onClick={() => handleSubmit('approved', news.news_id)} className="flex justify-around px-4 py-[10px] rounded-[10px] bg-[#22C55E] hover:bg-[#1F9D4B] active:bg-[#0E6F33]">
                                <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                  Approve
                                </div>
                              </button>
                              <button onClick={() => handleSubmit('rejected', news.news_id)} className="flex justify-around px-6 py-[10px] rounded-[10px] bg-[#EF4444] hover:bg-[#D62828] active:bg-[#B91C1C]">
                                <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
                                  Reject
                                </div>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
