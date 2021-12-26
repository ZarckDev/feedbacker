import Head from 'next/head';
import { Button, Container, Flex, Text } from '@chakra-ui/react';

import { useAuth } from '@lib/auth';
import { Logo } from '@styles/icons';

export default function Home() {
  const auth = useAuth();

  return (
    <Container>
      <Head>
        <title>Feedbacker</title>
        <script
          // Automaticaaly rediret to dashbord if already logged in
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('feedbacker-auth')) {
                window.location.href = "/dashboard"
              }
            `
          }}
        />
      </Head>
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
      >
        <Logo color="green.400" boxSize={20} />
        <Text mb={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Feedbacker
          </Text>
          {`. C'est la solution la plus simple pour ajouter des commentaires ou des avis à votre site statique. Ce projet est toujours en cours de développement mais vous pouvez tester l'application en vous inscrivant !`}
        </Text>

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
