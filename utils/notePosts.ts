export const NOTE_PROFILE_URL = 'https://note.com/sochigusa';
export const NOTE_REFRESH_INTERVAL = 10 * 60 * 1000;

export interface NotePost {
  title: string;
  url: string;
  publishedAt: string;
}
