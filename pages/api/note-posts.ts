import type { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';
import { NotePost, NOTE_PROFILE_URL, NOTE_REFRESH_INTERVAL } from '../../utils/notePosts';

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    // Fetch on the server: note's RSS cannot be fetched directly from the browser.
    const response = await fetch(`${NOTE_PROFILE_URL}/rss`, {
      signal: controller.signal,
      headers: { Accept: 'application/rss+xml' },
    });
    if (!response.ok) throw new Error(`note RSS returned ${response.status}.`);
    const feed = await new Parser().parseString(await response.text());
    const seen = new Set<string>();
    const posts: NotePost[] = [];
    for (const item of feed.items) {
      const publishedAt = Date.parse(item.isoDate || item.pubDate || '');
      if (!item.title?.trim() || !item.link || !Number.isFinite(publishedAt)) continue;
      // Only link to this author's articles, even if a feed item is malformed.
      if (!item.link.startsWith(`${NOTE_PROFILE_URL}/n/`)) continue;
      const articleId = item.link.slice(`${NOTE_PROFILE_URL}/n/`.length).split(/[?#]/)[0];
      if (!/^[a-zA-Z0-9]+$/.test(articleId)) continue;
      const url = `${NOTE_PROFILE_URL}/n/${articleId}`;
      if (seen.has(url)) continue;
      seen.add(url);
      posts.push({ title: item.title.trim(), url, publishedAt: new Date(publishedAt).toISOString() });
    }
    if (feed.items.length && !posts.length) throw new Error('No valid note articles in RSS.');
    posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    res.setHeader('Cache-Control', `public, max-age=0, s-maxage=${NOTE_REFRESH_INTERVAL / 1000}`);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Could not load note RSS:', error);
    res.status(503).json({ error: 'Could not load note articles.' });
  } finally {
    clearTimeout(timeout);
  }
}
