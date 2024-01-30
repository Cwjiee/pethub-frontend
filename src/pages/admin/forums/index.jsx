import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Posts from "@/components/molecules/Posts";
import Tag from "@/components/atoms/Tag";
import BackButton from "@/components/atoms/BackButton";
import { useState } from "react";
import { v4 } from "uuid";
import AdminNavbar from "@/components/organisms/AdminNavbar";
import AdminFooter from "@/components/organisms/AdminFooter";
import Image from "next/image";

export default function AdminForum() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([])
  const tags = [
    "Dogs",
    "Cats",
    "Hamsters",
    "Tips",
    "Healthcare",
    "Food",
    "Grooming",
  ];
  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (async() => {
      const response = await fetch(`${url}/posts`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      setPosts(result.post)
      console.log(posts)
    })()
  }, [token])

  return (
    <>
      <div className="flex flex-col justify-start min-h-screen">
        <AdminNavbar />
        <div className="w-[80%] m-auto pt-6 px-6 mb-6">
          <BackButton/>
          <div className="my-6"></div>
          <Searchbar input={input} setInput={setInput} label={"New Forums"} href={"/forums/create"}/>
          <div className="flex justify-between mt-4 mb-6">
            <div className="flex gap-x-[12px]">
              {tags.map((tag) => {
                return <Tag tag={tag} tagId={v4()} key={v4()} />;
              })}
            </div>
            <div
              className="flex justify-center items-center bg-white rounded-[40px] px-8 h-[32px] w-auto"
              style={{
                boxShadow:
                  "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
              }}
            >
              <span className="font-semibold text-md spacing tracking-[0.86px]">
                All
              </span>
            </div>
          </div>
          {posts.length > 0 ? 
            posts.map((post) => {
              return <Posts key={post.post_id} post={post} isAdmin />
            })
          :
            <div className="flex flex-col justify-center items-center mt-20">
              <Image src={Empty} width={200} height={245} alt="empty news"/>
              <div className="flex justify-center text-2xl m-20 font-bold text-secondary-500">Wow, such emptiness :(</div>
            </div>
          }
        </div>
        <AdminFooter />
      </div>
    </>
  );
}

AdminForum.getLayout = function getLayout(page) {
  return (
    <main>
      {page}
    </main>
  )
}
