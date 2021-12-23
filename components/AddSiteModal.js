import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr'; // get instant data on update
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import { createSite } from '@lib/db-firestore';
import { useAuth } from '@lib/auth';

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onCreateSite = ({ name, link }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      link
    };
    createSite(newSite);
    toast({
      title: 'Succès !',
      description: 'Nous avons ajouter votre site.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      '/api/sites',
      async (data) => {
        return { sites: [...data.sites, newSite] }; // api returns "sites", so get previous and add new site locally
      },
      false
    ); // update local data immediately and revalidate (refetch) -- acting on the cache
    reset();
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
        onClick={onOpen}
      >
        {children}
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
