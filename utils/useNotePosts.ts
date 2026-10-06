import useSWR from 'swr';
import { NotePost, NOTE_REFRESH_INTERVAL } from './notePosts';

const fetchNotePosts = async (url: string): Promise<NotePost[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Could not load note articles.');
  return response.json();
};

const useNotePosts = (enabled = true) => useSWR<NotePost[]>(enabled ? '/api/note-posts' : null, fetchNotePosts, {
  refreshInterval: NOTE_REFRESH_INTERVAL,
  dedupingInterval: 60 * 1000,
  errorRetryInterval: 60 * 1000,
});

export default useNotePosts;
