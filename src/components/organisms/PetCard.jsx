import Image from 'next/image'
export default function PetCard({pet}) {
  return (
    <>
    <div className="bg-white w-[350px] rounded-lg shadow-lg">
        <Image src="/download.jpeg" alt="this is a text" className="overflow-auto rounded-t-lg" width={350} height={100}/>
        <div className="py-5 px-5">
            <div><b>Name: </b>{pet.pet_name}</div>
            <div><b>Type: </b>{pet.type}</div>
            <div><b>Breed: </b>{pet.breed}</div>
            <div><b>Age: </b>{pet.age}</div>
            <div><b>Description: </b>{pet.description}</div>

            <div className="flex justify-end gap-3">
            <button>
                <Image
                src={"/edit.svg"}
                alt="edit"
                width={20}
                height={20}
                className="mt-1"
                />
            </button>
            
            <button>
                <Image
                src={"/delete.svg"}
                alt="delete"
                width={20}
                height={20}
                className="mt-1"
                />
            </button>
            </div>
        </div>
    </div>
    </>
  )
}
