import type { NextApiRequest, NextApiResponse } from 'next';
import { NotePost, NOTE_REFRESH_INTERVAL } from '../../utils/notePosts';
import loadNotePosts from '../../utils/loadNotePosts';

export default async function notePosts(
  req: NextApiRequest,
  res: NextApiResponse<NotePost[] | { error: string }>,
) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const posts = await loadNotePosts(req.query.locale === 'en' ? 'en' : 'ja');
    res.setHeader('Cache-Control', `public, max-age=0, s-maxage=${NOTE_REFRESH_INTERVAL / 1000}`);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Could not load note RSS:', error);
    res.status(503).json({ error: 'Could not load note articles.' });
  }
}
