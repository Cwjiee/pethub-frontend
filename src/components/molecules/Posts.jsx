import Image from "next/image";
import Edit from "@/../../public/edit.svg"
import Delete from "@/../../public/delete.svg"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { Select, useDisclosure, useToast } from "@chakra-ui/react";
import formatTimeAgo from "@/utils/TimeAgo";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

export default function Posts({ isAdmin, isSP, post, setReloadPost, ownPost, categories }) {
  const router = useRouter()
  const toast = useToast()
  const { token, userId } = useContext(GlobalContext)
  const url = process.env.NEXT_PUBLIC_API_URL
  const [time, setTime] = useState()
  const [editedTitle, setEditedTitle] = useState(post.post_title)
  const [editedComment, setEditedComment] = useState(post.post_description)
  const [editedCategory, setEditedCategory] = useState()

  const { 
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const { 
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()

  const handleChange = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setEditedCategory(selectedOptions);
  }

  const handleRoute = () => {
    if (isAdmin) {
      router.push(`/admin/forums/${post.post_id}`)
    } else if (isSP){
      router.push(`/service-providers/forums/${post.post_id}`)
    } else {
      router.push(`/forums/${post.post_id}`)
    }
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

  const handleEdit = async () => {
    if(!editedComment) {
      toast({
        title: 'description field is empty',
        description: 'Failed in editing post',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return 
    }
    const response = await fetch(`${url}/posts/${post.post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        user_id: userId,
        post_title: editedTitle,
        post_description: editedComment,
        categories: editedCategory,
      }),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-type": "application/json",
      }
    })

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Comment successfully edited',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setReloadPost(true)
      onCloseEdit()
      setEditedComment('')
    } else {
      toast({
        title: 'Error',
        description: 'Failed in editing comment',
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
      <Modal closeOnOverlayClick={false} isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit comment?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={editedTitle} onChange={(e) => {setEditedTitle(e.target.value)}} placeholder='Edit Title' />
              <FormLabel>Description</FormLabel>
              <Input value={editedComment} onChange={(e) => {setEditedComment(e.target.value)}} placeholder='Edit description' />
              <FormLabel>Categories</FormLabel>
              <Select multiple onChange={handleChange} value={editedCategory} height={250}>
                {categories && categories.map((cat) => {
                  return <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                })}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleEdit} >
              Edit
            </Button>
            <Button onClick={onCloseEdit}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal closeOnOverlayClick={false} isOpen={isOpenDelete} onClose={onCloseDelete}>
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
              onCloseDelete
            }}>
              Delete 
            </Button>
            <Button onClick={onCloseDelete}>Cancel</Button>
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
              <div key={category.category_id} className="flex justify-center items-center rounded-[40px] h-6 px-5 w-auto border border-[#D3D3D3]">
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
              <span className="text-sm font-semibold">{post.comments}</span>
            )}
          </div>
          <div className="bg-[#D9D9D9] rounded-full w-3 h-3"></div>
          <div>
            <span className="text-sm font-semibold">{time}</span>
          </div>
        </div>
        {isAdmin && (
          <span onClick={onOpenDelete}>
            <Image src={Delete} alt="delete button" width={17} height={17} className="absolute bottom-5 right-5 cursor-pointer"/>
          </span>
        )}
        {ownPost && !isAdmin && (
          <span onClick={onOpenEdit}>
            <Image src={Edit} alt="edit button" width={17} height={17} className="absolute bottom-5 right-5 cursor-pointer"/>
          </span>
        )}
      </div>
    </>
  );
}
