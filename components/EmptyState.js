import { Heading, Flex, Text } from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius="8px"
    p={16}
    justify="center"
    align="center"
    direction="column"
  >
    <Heading size="lg" mb={2} textAlign="center">
      Vous n'avez pas encore de site.
    </Heading>
    <Text mb={4}>C'est parti 💪</Text>
    <AddSiteModal>Ajouter votre premier site</AddSiteModal>
  </Flex>
);

export default EmptyState;
