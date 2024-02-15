import Link from "next/link";

export default function BookingBlock({ vet }) {
  return (
    <div className="sm:basis-[24%] h-[370px] rounded-[10px] bg-white shadow p-6 flex flex-col justify-between gap-3.5">
      <img
        width={255}
        height={170}
        src={vet.image}
        alt="booking-image"
      />
      <div className="mx-1">
        <h4 className="font-semibold">{vet.full_name}</h4>
        <div className="text-sm">{vet.opening_hour} - {vet.closing_hour}</div>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`./healthcare-facility/${vet.user_id}/new`} className="mt-auto h-10 font-semibold rounded-[10px] shadow text-white text-sm bg-primary-500 hover:bg-primary-600 active:bg-primary-700 flex justify-center items-center">
          Book Now
        </Link>
        <Link href={`./healthcare-facility/${vet.user_id}/`} className="mt-auto h-10 font-semibold rounded-[10px] shadow text-white text-sm bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 flex justify-center items-center">
          Read More
        </Link>
      </div>
    </div>
  );
}
