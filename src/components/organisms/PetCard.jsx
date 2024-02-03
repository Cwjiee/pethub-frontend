import { GlobalContext } from '@/context';
import Image from 'next/image'
import { redirect, useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import { useContext } from 'react';
export default function PetCard({pet}) {

  const router = useRouter();
  const params = useParams();

  const { token } = useContext(GlobalContext);

  async function handleDelete() {
    
    const response = await fetch(`${url}/pets/${params}`, {
      method: "DELETE",
      headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token 
      },
    });

    const result = await response.json();
    console.log(result);
    
    if(result.errors) {
        setErrors(result.errors)
    }

    if (!response.ok) {
      toast({
        title: 'Login failed',
        description: 'Please try again...',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Successfully created pet!',
        description: 'Redirecting you back...',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setTimeout(function () {
        router.push('/profile')
      }, 1000)
    }
  }

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
            <button onClick={() => redirect('/pet-owners/pets/edit')}>
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
