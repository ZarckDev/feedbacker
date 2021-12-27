import Head from 'next/head';
import { Button, Container, Flex, Text, Stack } from '@chakra-ui/react';

import { useAuth } from '@lib/auth';
import { Logo, GitHubIcon, GoogleIcon } from '@styles/icons';

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
        <Logo color="green.400" boxSize={24} />
        <Text mb={8} fontSize="lg">
          <Text as="span" fontWeight="bold" display="inline">
            Feedbacker
          </Text>
          {`. C'est la solution la plus simple pour ajouter des commentaires ou des avis à votre site statique. Ce projet est toujours en cours de développement mais vous pouvez tester l'application en vous inscrivant !`}
        </Text>

        {auth.user ? (
          <Button
            as="a"
            href="/dashboard"
            size="md"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            Voir mon compte
          </Button>
        ) : (
          <Stack>
            <Button
              leftIcon={<GitHubIcon h={6} w={6} mr={1} />}
              mt={4}
              size="md"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
              onClick={(e) => auth.signinWithGitHub()}
            >
              Se connecter avec GitHub
            </Button>
            <Button
              leftIcon={<GoogleIcon h={6} w={6} mr={1} />}
              mt={4}
              size="md"
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)'
              }}
              onClick={(e) => auth.signinWithGoogle()}
            >
              Se connecter avec Google
            </Button>
          </Stack>
        )}
      </Flex>
    </Container>
  );
}
