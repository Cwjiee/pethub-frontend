import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/SearchbarWithBtn";
import Tag from "@/components/atoms/Tag";
import { useState } from "react";
import { v4 } from "uuid";
import NewsBlock from "@/components/molecules/NewsBlock";

export default function News() {
  const [input, setInput] = useState("");

  const tags = ["Events", "Missing", "Promotions", "Adoptions"];

  return (
    <>
      <Navbar>Pet News</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar input={input} setInput={setInput} label={"New News"} />
        <div className="flex justify-between mt-4 mb-6">
          <div className="flex gap-x-[12px]">
            {tags.map((tag) => {
              return <Tag tag={tag} tagId={v4()} key={v4()} />;
            })}
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-between gap-5">
          <NewsBlock />
          <NewsBlock />
          <NewsBlock />
          <NewsBlock />
        </div>
      </div>
    </>
  );
}
