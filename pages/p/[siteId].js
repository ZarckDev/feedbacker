import { useRouter } from 'next/router';
import { useState } from 'react';

import { getAllFeedback, getAllSites } from '@lib/db-admin';
import { createFeedback } from '@lib/db-firestore';
import { useAuth } from '@lib/auth';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import Feedback from '@components/Feedback';

export async function getStaticProps(context) {
  // get the siteId mentioned in params url
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: { initialFeedback: feedback },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  // get all sites to defines what paths will be available
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() }
  })); // defines table of routes available for getStaticProps -- otherwise will raise 404 page

  return {
    paths,
    fallback: false
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    if (comment) {
      const newFeedback = {
        author: user.name,
        authorId: user.uid,
        siteId: router.query.siteId,
        text: comment,
        createdAt: new Date().toISOString(),
        provider: user.provider,
        status: 'pending'
      };

      setAllFeedback([newFeedback, ...allFeedback]);

      createFeedback(newFeedback);
      setComment('');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      mx="auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        {/* needed to set an id on parent, cause error id chakra if not... */}
        <FormControl my={8} id="addComment">
          <FormLabel htmlFor="comment">Commentaire</FormLabel>
          <Input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button mt={2} fontWeight="medium" type="submit">
            Ajouter
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback, index) => (
        <Feedback key={index} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
