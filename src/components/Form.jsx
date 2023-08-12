export default function Form() {
  return (
    <div className="mt-12">
      <div className="flex flex-col">
        <span className="font-semibold">Name:</span>
        <input
          type="text"
          className="rounded-[10px] px-6 py-2 outline-none border border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
        />
      </div>
      <div className="flex flex-col mt-[25px]">
        <span className="font-semibold">Email:</span>
        <input
          type="text"
          className="rounded-[10px] px-6 py-2 outline-none border border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
        />
      </div>
      <div className="flex flex-col mt-[25px]">
        <span className="font-semibold">Password:</span>
        <input
          type="text"
          className="rounded-[10px] px-6 py-2 outline-none border border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
        />
      </div>
      <div className="flex flex-col mt-[25px]">
        <span className="font-semibold">Confirm Password:</span>
        <input
          type="text"
          className="rounded-[10px] px-6 py-2 outline-none border border-[#E1E1E1] focus:border-[3px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-xl"
        />
      </div>
      <div className="mt-[40px]">
        Already have an account?{" "}
        <a href="#" className="text-[#6A75ED] underline font-semibold">Login</a>{" "}
        here!
      </div>
      <div className="bg-[#6A75ED] rounded-[10px] text-white h-12 flex justify-center items-center mt-[50px]">
        Submit
      </div>
    </div>
  );
}
