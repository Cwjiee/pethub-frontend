import Searchbar from "@/components/molecules/Searchbar";
import Navbar from "@/components/organisms/Navbar";

export default function PetBoarder() {
  return (
    <>
      <Navbar>Pet Boarders</Navbar>;
      <div className="w-[80%] m-auto pt-2 px-6">
        <Searchbar />
        <div className="flex flex-row flex-wrap justify-between gap-5">
          
        </div>
      </div>
    </>
  )
}
