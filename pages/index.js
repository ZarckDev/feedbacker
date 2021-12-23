import Head from 'next/head';
import { Button, Container, Flex } from '@chakra-ui/react';

import { useAuth } from '@lib/auth';
import { Logo } from '@styles/icons';

export default function Home() {
  const auth = useAuth();

  return (
    <Container>
      <Head>
        <title>Feedbacker</title>
      </Head>
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
      >
        <Logo color="green.400" boxSize={20} />

        {auth.user ? (
          <Button as="a" href="/dashboard">
            Voir mon compte
          </Button>
        ) : (
          <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
            Se connecter
          </Button>
        )}
      </Flex>
    </Container>
  );
}
