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

    const toastMessage = (err) => {
      toast({
        title: err,
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }

    const clearRespectiveField = (err) => {
      if (err === 'pet_name') {
        setPetName("")
        return
      } else if (err === 'type') {
        setType("")
        return
      } else if (err === 'description') {
        setDescription("")
        return
      } else if (err === 'age') {
        setAge()
        return
      } else if (err === 'image') {
        setImage(null)
        return
      }
    }

    const response = await fetch(`${url}/pets`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token 
      },
    });

    const data = await response.json();
    console.log(data.errors)

    if (response.ok) {
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
    } else {
      if (data.errors) {
        Object.keys(data.errors).forEach((err) => {
          const errMessage = data.errors[err]
          clearRespectiveField(err)
          toastMessage(errMessage)
        })
      } else {
        toastMessage("Failed to add pet")
      }
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
          <form action="" className="text-md" onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="pet-name">Pet Name: </label>
              <p>   
                <input 
                  type="text" 
                  className="rounded-lg w-full text-md border-[#e0e0e0]"
                  onChange={(e) => {setPetName(e.target.value)}}
                />
              </p>
            </div>
            <div className="mt-3">
              <label htmlFor="type">Type: </label>
              <p>
                <input 
                  type="text" 
                  className="rounded-lg w-full text-md border-[#e0e0e0]"
                  onChange={(e) => {setType(e.target.value)}}
                  placeholder="dog / cat / tortoise / snake"
                />
              </p>
            </div>
            <div className="mt-3">
              <label htmlFor="breed">Breed: <span class="text-sm text-red-500">*Only for dogs and cats*</span></label>
              <p>
                <input 
                  type="text" 
                  className="rounded-lg w-full text-md border-[#e0e0e0]"
                  onChange={(e) => {setBreed(e.target.value)}}
                />
              </p>
            </div>
            <div className="mt-3">
              <label htmlFor="age">Age: </label>
              <p>  
                <input 
                  type="text" 
                  className="rounded-lg w-full text-md border-[#e0e0e0]"
                  onChange={(e) => {setAge(e.target.value)}}
                  placeholder={"7 years old / 6 months old"}
                />
              </p>
            </div>
            <div className="mt-3">
              <label htmlFor="image">Image: </label>
              <p>
                <input 
                  type="file" 
                  className="block w-full text-md xtte-gray-900 border border-solid border-[#E1E1E1] rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:rounded-xl file:p-2 file:bg-primary-500 hover:file:bg-primary-600 active:file:bg-primary-700"
                  onChange={uploadToClient}
                />
              </p>
            </div>
            <div className="mt-3">
              <label htmlFor="description">Description: </label>
              <p>
                <textarea 
                  name="" 
                  id="" 
                  cols="30" 
                  rows="5" 
                  className="text-md w-full rounded-lg border-[#e0e0e0]"
                  onChange={(e) => {setDescription(e.target.value)}}
                  placeholder="very active at sports..."
                >

                </textarea>
              </p>
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
