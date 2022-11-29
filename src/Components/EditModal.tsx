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
import { Props } from "framer-motion/types/types";

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
                placeholder='買い物に行く'
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
              <Button onClick={props.editTodo(props.todoId, props.status)}><CheckIcon /></Button>
              <Button onClick={onClose}><CloseIcon /></Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>

  );
};