import Image from "next/image";
import DeleteBtn from "@/../public/svg/DeleteBtn.svg"

export default function Posts({ popular, isAdmin }) {
  return (
    <div
      className="rounded-[10px] bg-white h-auto py-4 px-8 my-[10px] relative"
      style={{
        boxShadow:
        "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center bg-white rounded-[40px] h-6 px-5 w-auto border border-[#D3D3D3]">
          <span className="font-semibold text-sm spacing">Dogs</span>
        </div>
        {popular ? (
          <div className="flex justify-center items-center bg-[#F64545] rounded-[20px] h-8 px-5 w-auto border border-[#D3D3D3] gap-x-2">
            <Image src={"/flame.svg"} alt="flame" width={20} height={20} />
            <span className="font-semibold text-sm spacing tracking-[0.86px] text-white">
              Popular
            </span>
          </div>
        ) : null}
      </div>
      <div className="title text-lg font-bold mt-3 spacing tracking-wide">
        How do I train my dog to not eat my food?
      </div>
      <div className="description text-sm mt-1">
        John: Well you can try not giving it your food first
      </div>
      <div className="info flex mt-4 items-center gap-x-3">
        <div className="flex justify-center items-center gap-x-2">
          <Image
            src={"/comment.svg"}
            alt="comment"
            width={14}
            height={14}
            className="mt-1"
          />
          <span className="text-sm font-semibold">15</span>
        </div>
        <div className="bg-[#D9D9D9] rounded-full w-3 h-3"></div>
        <div>
          <span className="text-sm font-semibold">1 h ago</span>
        </div>
      </div>
      {isAdmin && (
        <span>
          <Image src={DeleteBtn} alt="delete button" width={17} height={17} className="absolute bottom-5 right-5 cursor-pointer"/>
        </span>
      )}
    </div>
  );
}
