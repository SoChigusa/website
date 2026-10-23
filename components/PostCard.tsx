import { Box, Card, CardContent, CardMedia, Chip, Grid, SxProps, Theme, Typography } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from "./Link";
import PostImages from "./PostImages";
import useLocale from '../utils/useLocale';
import formatArticleDate from '../utils/formatArticleDate';
import type { ArticlePost } from '../utils/mergeArticlePosts';

const PostCard = ({ post, isIndexPage = false }: { post: ArticlePost, isIndexPage?: boolean }) => {
  const { locale } = useLocale();
  const isNote = 'publishedAt' in post;
  const title = isNote ? post.title : post.frontMatter.title;
  const date = isNote ? post.publishedAt : post.frontMatter.date;
  const href = isNote ? post.url : `/tips/${post.slug}`;
  const target = isNote ? '_blank' : undefined;
  let xs: number;
  let sm: number;
  let md: number;
  let sx: SxProps<Theme>;
  let sx_media: SxProps<Theme>;
  if (isIndexPage) { // layout for index.js
    xs = 12;
    sm = 12;
    md = 6;
    sx = {
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row', md: 'column', lg: 'row' },
      height: '100%'
    };
    sx_media = {
      height: 212,
      width: { xs: '88%', sm: 320, md: '88%', lg: 320 },
      px: { xs: '6%', sm: 0, md: '6%', lg: 0 },
      objectFit: 'contain'
    };
  } else { // layout for tips.js
    xs = 6;
    sm = 4;
    md = 3;
    sx = { display: 'flex', flexDirection: 'column', height: '100%' };
    sx_media = { height: 120, width: '88%', padding: '6%', objectFit: 'contain' };
  }

  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <Card component="article" sx={sx}>
        <Link href={href} target={target}>
          {isNote ? (
            post.thumbnail ? (
              <CardMedia component="img" sx={sx_media} image={post.thumbnail} alt={title} loading="lazy" />
            ) : (
              <Box sx={{ ...sx_media, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                <Typography sx={{ color: '#242424', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.06em' }}>note</Typography>
              </Box>
            )
          ) : post.frontMatter.images?.length ? (
            <PostImages images={post.frontMatter.images} sx={sx_media} />
          ) : (
            <CardMedia
              component='img'
              sx={sx_media}
              image={`/logos/${post.frontMatter.image}`}
              alt={title}
            />
          )}
        </Link>
        <CardContent>
          {isNote && (
            <Chip label="note" icon={<OpenInNewIcon />} size="small" variant="outlined" sx={{ mb: 1, fontWeight: 700 }} />
          )}
          <Typography variant="body1" component="div">
            <Link href={href} target={target}>
              {title}
            </Link>
          </Typography>
          <Typography component="time" dateTime={date} gutterBottom variant="body2" color="text.secondary" sx={{ display: 'block' }}>
            {formatArticleDate(date, locale)}
          </Typography>
          {!isNote && <Typography variant="body2">{post.frontMatter.description}</Typography>}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;
