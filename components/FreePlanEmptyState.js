import { Heading, Box, Text, Button } from '@chakra-ui/react';

import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Box
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={8}
      textAlign="center"
    >
      <Heading size="md">
        Obtenez des avis sur votre site instantanément.
      </Heading>
      <Text>Commencez aujourd'hui, évoluez ensuite à nos côtés 🌱</Text>
      <Button>Upgrade to Starter</Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
