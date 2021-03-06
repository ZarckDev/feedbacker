import { getSpecificUserSites } from '@lib/db-admin';
import { auth } from '@lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token); // from SWR fetcher request
    const { sites } = await getSpecificUserSites(uid);

    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error });
  }
};
