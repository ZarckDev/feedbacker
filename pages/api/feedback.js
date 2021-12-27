import { getSpecificUserFeedback } from '@lib/db-admin';
import { auth } from '@lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token); // from SWR fetcher request
    const { feedback } = await getSpecificUserFeedback(uid);

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error });
  }
};
