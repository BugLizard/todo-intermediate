import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Modal as ChakraModal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import {Dispatch, SetStateAction } from "react";
type Props = {
  editTodo: (
    id: number,
    editTodoState: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  todoId: number;
  status: string;
  setTextName: Dispatch<SetStateAction<string>>;
  setTextDetail: Dispatch<SetStateAction<string>>;
  textName: string;
  textDetail: string;
}

export const EditModal: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}><EditIcon /></Button>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="stageItem">
              <FormLabel>タイトル</FormLabel>
              <Input
                type='text'
                value={props.textName}
                onChange={(e) => {
                  props.setTextName(e.target.value)
                }}
                className='textNameInput'
              />
              <Spacer h={4} />
              <FormLabel>詳細</FormLabel>
              <Textarea 
                value={props.textDetail}
                onChange={(e) => {
                  props.setTextDetail(e.target.value);
                }}
              />
              <Spacer h={4} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button disabled={props.textName === ''} onClick={(e) => props.editTodo(props.todoId, props.status, e)}><CheckIcon /></Button>
              <Button onClick={onClose}><CloseIcon /></Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>

  );
};