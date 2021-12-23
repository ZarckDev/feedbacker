import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  Avatar
} from '@chakra-ui/react';

import { Logo } from '@styles/icons';
import { useAuth } from '@lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Box backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          mx="auto"
          w="full"
          px={8}
        >
          <Flex justifyContent="center" alignItems="center">
            <Logo color="green.400" boxSize={10} mr={10} />
            <Link mr={8}>Sites</Link>
            <Link>Avis</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Button variant="ghost" mr={2} onClick={() => signout()}>
              Se déconnecter
            </Button>
            <Avatar size="sm" src={user.photoUrl} />
          </Flex>
        </Flex>
      </Box>
      <Flex mx="auto" direction="column" maxW="1250px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink color="gray.600" fontSize="sm">
              Sites
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>Mes sites</Heading>
          <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            + Ajouter Site
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
