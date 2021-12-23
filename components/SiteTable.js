import { Box, Link } from '@chakra-ui/react';
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
              <Link>Voir les avis</Link>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp', { locale: fr })}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
