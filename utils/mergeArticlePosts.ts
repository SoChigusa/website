import type { NotePost } from './notePosts';

export type ArticlePost = Post | NotePost;

export const articlePostKey = (post: ArticlePost): string => (
  'publishedAt' in post ? post.url : `/tips/${post.slug}`
);

const articleTimestamp = (post: ArticlePost): number => {
  // Local dates specify a calendar day; interpret it in the note feed's timezone.
  const date = 'publishedAt' in post ? post.publishedAt : `${post.frontMatter.date}T00:00:00+09:00`;
  return Date.parse(date) || 0;
};

export default function mergeArticlePosts(localPosts: Post[], notePosts: NotePost[]): ArticlePost[] {
  return [...localPosts, ...notePosts].sort((a, b) => articleTimestamp(b) - articleTimestamp(a));
}
