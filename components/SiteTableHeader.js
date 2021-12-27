import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box
} from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = () => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.600" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>Mes sites</Heading>
        <AddSiteModal>+ Ajouter Site</AddSiteModal>
      </Flex>
    </Box>
  );
};

export default SiteTableHeader;
