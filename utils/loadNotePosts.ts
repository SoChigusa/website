import Parser from 'rss-parser';
import { NotePost, NOTE_PROFILE_URL } from './notePosts';
import { localizeNotePost } from './localizeNotePost';

export default async function loadNotePosts(locale: string | undefined): Promise<NotePost[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${NOTE_PROFILE_URL}/rss`, {
      signal: controller.signal,
      headers: { Accept: 'application/rss+xml' },
    });
    if (!response.ok) throw new Error(`note RSS returned ${response.status}.`);
    const parser = new Parser<{}, { 'media:thumbnail'?: string }>({
      customFields: { item: ['media:thumbnail'] },
    });
    const feed = await parser.parseString(await response.text());
    const seen = new Set<string>();
    const posts: NotePost[] = [];
    for (const item of feed.items) {
      const publishedAt = Date.parse(item.isoDate || item.pubDate || '');
      if (!item.title?.trim() || !item.link || !Number.isFinite(publishedAt)) continue;
      if (!item.link.startsWith(`${NOTE_PROFILE_URL}/n/`)) continue;
      const articleId = item.link.slice(`${NOTE_PROFILE_URL}/n/`.length).split(/[?#]/)[0];
      if (!/^[a-zA-Z0-9]+$/.test(articleId)) continue;
      const url = `${NOTE_PROFILE_URL}/n/${articleId}`;
      if (seen.has(url)) continue;
      seen.add(url);
      const thumbnail = item['media:thumbnail'];
      posts.push({
        title: item.title.trim(),
        url,
        publishedAt: new Date(publishedAt).toISOString(),
        ...(typeof thumbnail === 'string' && thumbnail.startsWith('https://') ? { thumbnail } : {}),
      });
    }
    if (feed.items.length && !posts.length) throw new Error('No valid note articles in RSS.');
    posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    return locale === 'en' ? Promise.all(posts.map(localizeNotePost)) : posts;
  } finally {
    clearTimeout(timeout);
  }
}
