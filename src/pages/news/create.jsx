import Navbar from "@/components/organisms/Navbar";

export default function CreateNews() {
	return (
		<>
                  <Navbar title={false}>Pet News</Navbar>
                    <div className="w-[40%] mt-12 m-auto py-11 px-16 bg-white">
                      <div className="flex flex-col justify-between gap-[25px]">
                        <h2 className="mx-auto font-bold text-xl">Create Pet News</h2>
                        <div>
                          <div>News Name:</div>
                          <input 
                          onChange={(e) => setInput(e.target.value)}
                          className="w-full h-10 rounded-[10px] border-2 border-neutral-200"
                          /> 
                        </div>
                        <div>
                          <div>News Description:</div>
                          <input
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-52 rounded-[10px] border-2 border-neutral-200"
                          />
                        </div> 
                        <div>
                          <div>Upload Image:</div>
                          <input
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 rounded-[10px] border-2 border-neutral-200"
                          />
                        </div>
                        <div>
                          <div>Category:</div>
                          <input
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 rounded-[10px] border-2 border-neutral-200"
                          />
                        </div>
                        <input 
                          type="submit"
                          className="w-full h-10 rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white"
                        />
                    </div>
                  </div>
		</>
	)
}
