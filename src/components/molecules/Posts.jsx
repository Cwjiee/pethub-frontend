import Image from "next/image";
import DeleteBtn from "@/../public/svg/DeleteBtn.svg"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { useDisclosure, useToast } from "@chakra-ui/react";
import formatTimeAgo from "@/utils/TimeAgo";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

export default function Posts({ isAdmin, post, setReloadPost }) {
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { token } = useContext(GlobalContext)
  const url = process.env.NEXT_PUBLIC_API_URL
  const [time, setTime] = useState()

  const handleRoute = () => {
    router.push(`./forums/${post.post_id}`)
  }

  const handleDelete = async () => {
    const response = await fetch(`${url}/posts/${post.post_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Post successfully deleted',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setReloadPost(true)
      
    } else {
      toast({
        title: 'Error',
        description: 'Failed in deleting post',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    if (post) {
      setTime(formatTimeAgo(post.created_at))
    }
  }, [post])

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete post?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to delete this post?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => {
              handleDelete();
              onClose
            }}>
              Delete 
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div
        className="rounded-[10px] bg-white h-auto py-4 px-8 my-[10px] relative mt-[15px]"
        style={{
          boxShadow:
          "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div className="flex justify-left gap-x-2">
          {post.categories.map((category) => {
            return (
              <div className="flex justify-center items-center rounded-[40px] h-6 px-5 w-auto border border-[#D3D3D3]">
                <span className="font-semibold text-sm spacing">{category.category_name}</span>
              </div>
            )}
          )}
        </div>
        <div className="title text-lg font-bold mt-3 spacing tracking-wide">
          {post.post_title}
        </div>
        <div className="description text-sm mt-1">
          {post.post_description}
        </div>
        <div className="info flex mt-4 items-center gap-x-3">
          <div onClick={handleRoute} className="flex justify-center items-center gap-x-2 hover:cursor-pointer">
            <Image
              src={"/comment.svg"}
              alt="comment"
              width={14}
              height={14}
              className="mt-1"
            />
            {post.comments && (
              <span className="text-sm font-semibold">{post.comments.length}</span>
            )}
          </div>
          <div className="bg-[#D9D9D9] rounded-full w-3 h-3"></div>
          <div>
            <span className="text-sm font-semibold">{time}</span>
          </div>
        </div>
        {isAdmin && (
          <span onClick={onOpen}>
            <Image src={DeleteBtn} alt="delete button" width={17} height={17} className="absolute bottom-5 right-5 cursor-pointer"/>
          </span>
        )}
      </div>
    </>
  );
}
