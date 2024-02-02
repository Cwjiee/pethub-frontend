import Navbar from "@/components/organisms/Navbar";

export default function Add() {
  return (
    <>
    <Navbar/>
        <div className="bg-white rounded-lg shadow-lg mx-auto w-[530px] py-10 px-10 mt-24">
            <h1 className="text-center text-2xl font-bold mb-5">Add Pet</h1>
            <form action="" className="text-sm">
                <label htmlFor="">Pet Name: </label>
                <p className="mb-3">   
                    <input 
                        type="text" 
                        className="rounded-lg w-full text-sm border-[#e0e0e0]"
                    />
                </p>
                <label htmlFor="">Type: </label>
                <p className="mb-3">
                    <input 
                        type="text" 
                        className="rounded-lg w-full text-sm border-[#e0e0e0]"
                    />
                </p>
                <label htmlFor="">Breed: </label>
                <p className="mb-3">
                    <input 
                        type="text" 
                        className="rounded-lg w-full text-sm border-[#e0e0e0]"
                    />
                </p>
                <label htmlFor="">Age: </label>
                <p className="mb-3">  
                    <input 
                        type="text" 
                        className="rounded-lg w-full text-sm border-[#e0e0e0]"
                    />
                </p>
                <label htmlFor="">Image: </label>
                <p className="mb-3">
                    <input 
                        type="file" 
                        className="block w-full text-sm text-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700"
                    />
                </p>
                <label htmlFor="">Description: </label>
                <p className="mb-5">
                    <textarea 
                        name="" 
                        id="" 
                        cols="30" 
                        rows="5" 
                        className="text-sm w-full rounded-lg border-[#e0e0e0]">
                    </textarea>
                </p>
                <input 
                    type="submit" 
                    className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg w-full text-white py-3"
                />
            </form>
        </div>
    </>
  )
}
