import { GlobalContext } from '@/context';
import Image from 'next/image'
import { redirect, useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { useToast } from "@chakra-ui/react";

export default function PetCard({pet}) {
  const router = useRouter();
  const toast = useToast();
  const { token } = useContext(GlobalContext);
  const url = process.env.NEXT_PUBLIC_API_URL
  
  async function handleDelete(pet_id) {
    
    if(url && pet_id) {
      const response = await fetch(`${url}/pets/${pet_id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token 
        },
      });
  
      const result = await response.json();
      console.log(result);
      
      if (!response.ok) {
        toast({
          title: 'Failed to delete',
          description: 'Please try again...',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Successfully deleted pet!',
          description: 'Your pet is gone.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        setTimeout(function () {
          router.reload()
        }, 1000)
      }
    }
  }

  return (
    <>
    <div className="bg-white w-[350px] rounded-lg shadow-lg">
        <img src={pet.image} alt="this is a text" className="overflow-auto rounded-t-lg" width={350} height={100}/>
        <div className="py-5 px-5">
            <div><b>Name: </b>{pet.pet_name}</div>
            <div><b>Type: </b>{pet.type}</div>
            <div><b>Breed: </b>{pet.breed}</div>
            <div><b>Age: </b>{pet.age}</div>
            <div><b>Description: </b>{pet.description}</div>

            <div className="flex justify-end gap-3">
            <button onClick={() => router.push(`/pet-owners/pets/edit/${pet.pet_id}`)}>
                <Image
                src={"/edit.svg"}
                alt="edit"
                width={20}
                height={20}
                className="mt-1"
                />
            </button>
            
            <button onClick={() => handleDelete(pet.pet_id)}>
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
