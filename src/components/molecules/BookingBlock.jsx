import Image from "next/image";
import BookingPlaceholder from "../../../public/png/BookingPlaceholder.png";

export default function BookingBlock({ vet }) {
  return (
    <div className="sm:basis-[24%] h-[370px] rounded-[10px] bg-white shadow p-6 flex flex-col justify-between gap-3.5">
      <Image
        className="w-full h-1/2"
        src={BookingPlaceholder}
        alt="news-placeholder"
      />
      <div className="mx-1">
        <h4 className="font-semibold">{vet.name}</h4>
        <div className="text-sm">{vet.time}</div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="mt-auto h-10 font-semibold rounded-[10px] shadow text-white text-sm bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
          Book Now
        </button>
        <button className="mt-auto h-10 font-semibold rounded-[10px] shadow text-white text-sm bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700">
          Read More
        </button>
      </div>
    </div>
  );
}
