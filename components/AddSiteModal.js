import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
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
  useDisclosure
} from '@chakra-ui/react';

import { createSite } from '@lib/db-firestore';

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onCreateSite = (data) => createSite(data);

  return (
    <>
      <Button fontWeight="medium" onClick={onOpen}>
        Ajouter votre premier site
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Ajouter un site</ModalHeader>
          <ModalCloseButton
            _focus={{
              boxShadow:
                '0 0 2px 2px rgba(56, 161, 105, .55), 0 1px 1px rgba(0, 0, 0, .15)'
            }}
          />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                {...register('name', {
                  required: true
                })}
                placeholder="Nom du site"
              />
              {errors.name?.type === 'required' && 'Un nom de site est requis'}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Lien</FormLabel>
              <Input
                {...register('link', {
                  required: true
                })}
                placeholder="https://website.com"
              />
              {/* Same as above */}
              {errors.link && 'Le lien vers votre site est requis'}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Annuler
            </Button>
            <Button type="submit" colorScheme="green">
              Créer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
