import useSWR from 'swr';
import { NotePost, NOTE_REFRESH_INTERVAL } from './notePosts';
import useLocale from './useLocale';

const fetchNotePosts = async (url: string): Promise<NotePost[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Could not load note articles.');
  return response.json();
};

const useNotePosts = (initialPosts?: NotePost[]) => {
  const { locale } = useLocale();
  return useSWR<NotePost[]>(`/api/note-posts?locale=${locale === 'en' ? 'en' : 'ja'}`, fetchNotePosts, {
    fallbackData: initialPosts,
    refreshInterval: NOTE_REFRESH_INTERVAL,
    dedupingInterval: 60 * 1000,
    errorRetryInterval: 60 * 1000,
  });
};

export default useNotePosts;
