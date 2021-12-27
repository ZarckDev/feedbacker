import { Box, Button, Flex, Link, Avatar } from '@chakra-ui/react';
import NextLink from 'next/link';
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
            <NextLink href="/" passHref>
              <Link>
                <Logo color="green.400" boxSize={10} mr={10} />
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link mr={8}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Avis</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <Button variant="ghost" mr={2} onClick={() => signout()}>
                Se déconnecter
              </Button>
            )}
            {/* error when loading in no user yet set. so put ? as user? */}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Box>
      <Flex mx="auto" direction="column" maxW="1250px" px={8}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
