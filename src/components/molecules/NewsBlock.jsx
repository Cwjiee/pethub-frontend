import Link from "next/link";

export default function NewsBlock({ news }) {
  return (
    <div className="w-[80%] h-[30rem] rounded-[10px] bg-white shadow p-6 flex justify-between mx-auto">
      <img
        className="w-1/2 h-full"
        src={news.image}
        alt="news-placeholder"
      />
      <div className="w-1/2 flex flex-col pl-6 gap-[10px]">
        <h4 className="font-bold">{news.news_title}</h4>
        <div className="mr-auto flex justify-center items-center gap-y-2">
          <div className="flex justify-left gap-x-2">
            {news.categories.map((category) => {
              return (
                <div key={category.category_id} className="flex justify-center items-center rounded-[40px] h-auto px-5 w-auto border border-[#D3D3D3]">
                  <span className="font-semibold text-sm spacing">{category.category_name}</span>
                </div>
              )}
            )}
          </div>
        </div>
        <div className="text-justify text-black text-md font-normal overflow-auto h-[70%]">
          {news.news_description}
        </div>
        <Link href={"news/" + news.news_id} className="mt-auto w-full flex justify-between items-center h-12 font-semibold rounded-[10px] shadow text-white text-sm bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700">
          <div className="m-auto tracking-[0.753px]">Read More</div>
        </Link>
      </div>
    </div>
  );
}
