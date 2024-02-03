import Navbar from "@/components/organisms/Navbar";
import Searchbar from "@/components/molecules/Searchbar";
import BookingBlock from "@/components/molecules/BookingBlock";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context";

export default function Veterinary() {
  const [input, setInput] = useState("");

  const vet = {
    name: "Amy's Veterinary Clinic",
    time: "12pm - 6pm",
  };

  const {token} = useContext(GlobalContext)
  console.log(token);

  return (
    <>
      <Navbar title={true}>Healthcare Facility</Navbar>
      <div className="w-[80%] m-auto pt-6 px-6">
        <Searchbar input={input} setInput={setInput} />
        <div className="flex flex-row flex-wrap justify-between gap-3 mt-10">
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
          <BookingBlock vet={vet} />
        </div>
      </div>
    </>
  );
}
