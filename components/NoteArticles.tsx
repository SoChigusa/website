import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from './Link';
import useLocale from '../utils/useLocale';
import useNotePosts from '../utils/useNotePosts';
import { NOTE_PROFILE_URL } from '../utils/notePosts';

const NoteArticles = () => {
  const { locale, t } = useLocale();
  const { data: posts, error } = useNotePosts();

  return (
    <Box component="section" aria-labelledby="note-articles-title" sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
        <Typography id="note-articles-title" variant="h6" component="h2">{t.NOTE_ARTICLES}</Typography>
        <Link href={NOTE_PROFILE_URL} target="_blank">
          {t.SEE_ALL_NOTE_ARTICLES}
          <OpenInNewIcon sx={{ fontSize: 14, ml: 0.5, verticalAlign: 'middle' }} />
        </Link>
      </Box>
      <Paper variant="outlined">
        {posts?.length ? (
          <List disablePadding>
            {posts.slice(0, 6).map((post, index, visiblePosts) => (
              <ListItem key={post.url} divider={index < visiblePosts.length - 1} sx={{ alignItems: 'baseline', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.5, sm: 2 }, py: 1.5 }}>
                <Typography component="time" dateTime={post.publishedAt} variant="body2" color="text.secondary" sx={{ flexShrink: 0, minWidth: { sm: 110 } }}>
                  {new Date(post.publishedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Tokyo',
                  })}
                </Typography>
                <Link href={post.url} target="_blank">
                  {post.title}
                  <OpenInNewIcon sx={{ fontSize: 14, ml: 0.5, verticalAlign: 'middle' }} />
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography role="status" color="text.secondary" sx={{ p: 2 }}>
            {posts ? t.NOTE_ARTICLES_EMPTY : error ? t.NOTE_ARTICLES_UNAVAILABLE : t.NOTE_ARTICLES_LOADING}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default NoteArticles;
