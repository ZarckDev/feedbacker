import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Nom</Th>
          <Th>Lien du site</Th>
          <Th>Avis</Th>
          <Th>Ajouté le</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.link}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              {/* passHref to pass to the Link */}
              <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                <Link>Voir les avis</Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp', { locale: fr })}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
