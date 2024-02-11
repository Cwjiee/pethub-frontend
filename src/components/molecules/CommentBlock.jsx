import DateTimeBlock from "../atoms/DateTimeBlock"
import Image from "next/image"
import Edit from "@/../../public/edit.svg"
import Delete from "@/../../public/delete.svg"
import { 
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context"

export default function CommentBlock({ id, name, date, desc, isAdmin, isSP, setReloadComment }) {
  const [editedComment, setEditedComment] = useState('')
  const { token } = useContext(GlobalContext)
  const url = process.env.NEXT_PUBLIC_API_URL
  const toast = useToast()

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

  const handleDelete = async () => {
    const response = await fetch(`${url}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Comment successfully deleted',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setReloadComment(true)

    } else {
      toast({
        title: 'Error',
        description: 'Failed in deleting comment',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleEdit = async () => {
    if(setReloadComment) console.log('available')
    const response = await fetch(`${url}/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        comment_description: editedComment,
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
      setReloadComment(true)

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

  return (
    <div className="p px-4 border border-[#E0E0E0] rounded-[10px]">
      {!isAdmin && !isSP ? (
        <div className="flex flex-row my-5 gap-2">
          <div className="flex justify-center items-center"><Avatar colorScheme="blue" size="sm" name={name}/></div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-left items-center gap-2">
              <div>{name}</div>
              <DateTimeBlock datetimeString={date}/>
            </div>
            <div className="text-[#4E4E4E] text-[14px]">{desc}</div>
          </div>
        </div>
      ) : (
          <>
            <Modal closeOnOverlayClick={false} isOpen={isOpenDelete} onClose={onCloseDelete}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete comment?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  Are you sure you want to delete this comment?
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
            <Modal closeOnOverlayClick={false} isOpen={isOpenEdit} onClose={onCloseEdit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit comment?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Comment</FormLabel>
                    <Input value={editedComment} onChange={(e) => {setEditedComment(e.target.value)}} placeholder='Edit comment' />
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
            <div className="flex flex-row my-5 justify-between gap-3">
              <div className="flex flex-row gap-2">
                <div className="flex justify-center items-center"><Avatar colorScheme="blue" size="sm" name={name}/></div>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-left items-center gap-2">
                    <div>{name}</div>
                    <DateTimeBlock datetimeString={date}/>
                  </div>
                  <div className="text-[#4E4E4E] text-[14px]">{desc}</div>
                </div>
              </div>

              <div className="flex flex-row gap-2 items-center">
                {isSP && (
                  <span onClick={onOpenEdit}>
                    <Image src={Edit} alt="edit button" width={17} height={17} className="cursor-pointer"/>
                  </span>
                )}
                <span onClick={onOpenDelete}>
                  <Image src={Delete} alt="delete button" width={17} height={17} className="cursor-pointer"/>
                </span>
              </div>
            </div>
          </>
        )}
    </div>
  )
}
