import Navbar from "@/components/organisms/Navbar";
import { GlobalContext } from "@/context";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useToast } from '@chakra-ui/react'
import BackButton from "@/components/atoms/BackButton";
import checkAuth from "@/utils/checkAuth";
import Footer from "@/components/organisms/Footer";

function Add() {
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState();
  const { token, userId } = useContext(GlobalContext);
  const toast = useToast();

  const router = useRouter();

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
      setImage(i)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const body = new FormData()
    body.append("user_id", userId);
    body.append("pet_name", petName);
    body.append("type", type);
    body.append("breed", breed);
    body.append("age", age);
    body.append("image", image);
    body.append("description", description);

    const url = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${url}/pets`, {
      method: "POST",
      body: body,
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
        title: 'Failed to add pet',
        description: 'Please try again...',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Successfully added pet!',
        description: 'Redirecting you back...',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setTimeout(function () {
        router.push('/profile')
      }, 1000)
    }

    /* router.push('/pet-owners/pets'); */
  }
  return (
    <>
      <Navbar/>
      <div className="w-[90%] mx-auto m-10">
        <BackButton/>
        <div className="bg-white rounded-lg shadow-lg mx-auto w-[530px] py-10 px-10 m-6">

          <h1 className="text-center text-2xl font-bold mb-5">Add Pet</h1>
          <form action="" className="text-sm" onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="pet-name">Pet Name: </label>
              <p>   
                <input 
                  type="text" 
                  className="rounded-lg w-full text-sm border-[#e0e0e0]"
                  onChange={(e) => {setPetName(e.target.value)}}
                />
              </p>
              {errors && errors.pet_name && <p className="text-red-500">{errors.pet_name.toString()}</p>}
            </div>
            <div className="mt-3">
              <label htmlFor="type">Type: </label>
              <p>
                <input 
                  type="text" 
                  className="rounded-lg w-full text-sm border-[#e0e0e0]"
                  onChange={(e) => {setType(e.target.value)}}
                />
              </p>
              {errors && errors.type && <p className="text-red-500">{errors.type.toString()}</p>}
            </div>
            <div className="mt-3">
              <label htmlFor="breed">Breed: </label>
              <p>
                <input 
                  type="text" 
                  className="rounded-lg w-full text-sm border-[#e0e0e0]"
                  onChange={(e) => {setBreed(e.target.value)}}
                />
              </p>
              {errors && errors.breed && <p className="text-red-500">{errors.breed.toString()}</p>}
            </div>
            <div className="mt-3">
              <label htmlFor="age">Age: </label>
              <p>  
                <input 
                  type="text" 
                  className="rounded-lg w-full text-sm border-[#e0e0e0]"
                  onChange={(e) => {setAge(e.target.value)}}
                />
              </p>
              {errors && errors.age && <p className="text-red-500">{errors.age.toString()}</p>}
            </div>
            <div className="mt-3">
              <label htmlFor="image">Image: </label>
              <p>
                <input 
                  type="file" 
                  className="block w-full text-sm xtte-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700"
                  onChange={uploadToClient}
                />
              </p>
              {errors && errors.image && <p className="text-red-500">{errors.image.toString()}</p>}
            </div>
            <div className="mt-3">
              <label htmlFor="description">Description: </label>
              <p>
                <textarea 
                  name="" 
                  id="" 
                  cols="30" 
                  rows="5" 
                  className="text-sm w-full rounded-lg border-[#e0e0e0]"
                  onChange={(e) => {setDescription(e.target.value)}}
                >

                </textarea>
              </p>
              {errors && errors.description && <p className="text-red-500">{errors.description.toString()}</p>}
            </div>

            <input 
              value="Submit"
              type="submit" 
              className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg w-full text-white py-3 mt-5 hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default checkAuth(Add)
