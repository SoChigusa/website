import { parse } from 'node-html-parser';
import type { NotePost } from './notePosts';

export const getEnglishNoteTitle = (html: string): string | null => {
  const document = parse(html);
  const language = document.querySelector('html')?.getAttribute('lang');
  if (!language || !/^en(?:-|$)/i.test(language)) return null;

  // note's Open Graph title includes the author's name after the final separator.
  const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
  return title?.replace(/｜[^｜]*$/, '').trim() || null;
};

export const localizeNotePost = async (post: NotePost): Promise<NotePost> => {
  const url = `${post.url}?hl=en`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'text/html' },
    });
    if (!response.ok) return post;
    const title = getEnglishNoteTitle(await response.text());
    return title ? { ...post, title, url } : post;
  } catch {
    // A missing translation or a temporary failure should not hide the article.
    return post;
  } finally {
    clearTimeout(timeout);
  }
};
