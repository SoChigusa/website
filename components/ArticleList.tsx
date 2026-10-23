import { Box, Grid, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { NotePost, NOTE_PROFILE_URL } from '../utils/notePosts';
import mergeArticlePosts, { articlePostKey } from '../utils/mergeArticlePosts';
import useNotePosts from '../utils/useNotePosts';
import useLocale from '../utils/useLocale';
import Link from './Link';
import PostCard from './PostCard';
import NotePostsStatus from './NotePostsStatus';
import PaginationBar, { PAGE_SIZE } from './PaginationBar';

const ArticleList = ({ localPosts, initialNotePosts, currentPage = 1 }: {
  localPosts: Post[];
  initialNotePosts?: NotePost[];
  currentPage?: number;
}) => {
  const { t } = useLocale();
  const { data: notePosts = [], error, isValidating } = useNotePosts(initialNotePosts);
  const allPosts = mergeArticlePosts(localPosts, notePosts);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const posts = allPosts.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage);

  return (
    <>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Link href={NOTE_PROFILE_URL} target="_blank" color="text.secondary">
          <Typography component="span" variant="body2">
            {t.NOTE_PROFILE}
            <OpenInNewIcon sx={{ fontSize: 14, ml: 0.5, verticalAlign: 'middle' }} />
          </Typography>
        </Link>
      </Box>
      <NotePostsStatus loading={isValidating} hasPosts={notePosts.length > 0} failed={Boolean(error)} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {posts.map(post => <PostCard key={articlePostKey(post)} post={post} />)}
        </Grid>
      </Box>
      <PaginationBar total_page={totalPages} current_page={currentPage} />
    </>
  );
};

export default ArticleList;
