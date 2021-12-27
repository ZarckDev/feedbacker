import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  ButtonGroup,
  Button
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import { mutate } from 'swr'; // get instant data on update

import { deleteFeedback } from '@lib/db-firestore';
import { useAuth } from '@lib/auth';

const RemoveButton = ({ feedbackId }) => {
  const initialFocusRef = useRef();
  const auth = useAuth();

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="left"
      closeOnBlur={false}
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button variant="ghost">
              <DeleteIcon w={5} h={5} color="red.500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent borderColor="green.500">
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              Êtes-vous sûr de vouloir supprimer cet avis ?
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button
                  colorScheme="green"
                  ref={initialFocusRef}
                  onClick={() => {
                    deleteFeedback(feedbackId);
                    mutate(
                      ['/api/feedback', auth.user.token],
                      async (data) => {
                        return {
                          feedback: data.feedback.filter(
                            (feedback) => feedback.id !== feedbackId
                          )
                        };
                      },
                      false
                    ); // update local data immediately and revalidate (refetch) -- acting on the cache
                    onClose();
                  }}
                >
                  Supprimer
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default RemoveButton;
