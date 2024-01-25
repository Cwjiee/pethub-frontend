import Image from "next/image";
import Link from "next/link";
import NewsPlaceholder from "../../../public/png/NewsPlaceholder.png";

export default function NewsBlock({ news }) {
  return (
    <div className="sm:basis-[49%] h-80 rounded-[10px] bg-white shadow p-6 flex justify-between">
      <img
        className="w-1/2 h-full"
        src={news.image}
        alt="news-placeholder"
      />
      <div className="w-1/2 flex flex-col pl-6 gap-[10px]">
        <h4 className="font-bold">{news.news_title}</h4>
        <div className="mr-auto flex justify-center items-center">
          <div className="py-1 px-6 text-center text-neutral-800 text-sm font-bold font-['Nunito'] rounded-[40px] border border-neutral-300">
            Events
          </div>
        </div>
        <div className="text-justify text-black text-sm font-normal">
          {news.news_description}
        </div>
        <Link href={"news/" + news.news_id} className="mt-auto w-full flex justify-between items-center h-10 font-semibold rounded-[10px] shadow text-white text-sm bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700">
          <div className="m-auto tracking-[0.753px]">Read More</div>
        </Link>
      </div>
    </div>
  );
}
