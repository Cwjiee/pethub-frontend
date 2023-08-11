import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Posts from "@/components/Posts";
import { useState } from "react";
import { v4 } from "uuid";

export default function Forum() {
  const [input, setInput] = useState("");
  const tags = [
    "Dogs",
    "Cats",
    "Hamsters",
    "Tips",
    "Healthcare",
    "Food",
    "Grooming",
  ];

  return (
    <>
      <Navbar>Forums</Navbar>
      <div className="w-[80%] m-auto pt-8 px-6">
        <Searchbar input={input} />
        <div className="flex justify-between mt-8">
          <div className="w-[80%] flex gap-x-[18px]">
            {tags.map((tag) => {
              return (
                <div
                  className="flex justify-center items-center bg-white rounded-[40px] h-12 px-8 py-4 w-auto"
                  style={{
                    boxShadow:
                      "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
                  }}
                  key={v4()}
                >
                  <span className="font-bold text-lg spacing tracking-[0.86px]">
                    {tag}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-[10%]">
            <div
              className="flex justify-center items-center bg-white rounded-[40px] h-12 px-8 py-4 w-auto"
              style={{
                boxShadow:
                  "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
              }}
            >
              <span className="font-bold text-lg spacing tracking-[0.86px]">
                All
              </span>
            </div>
          </div>
        </div>
        <Posts popular={true} />
        <Posts popular={false} />
        <Posts popular={false} />
        <Posts popular={false} />
      </div>
    </>
  );
}
