import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "./Link";

const PostCard = ({ post, isIndexPage = false }: { post: any, isIndexPage?: boolean }) => {
  let xs, sm, md, sx, sx_media;
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
      <Card sx={sx}>
        <Link href={`/tips/${post.slug}`}>
          <CardMedia
            component='img'
            sx={sx_media}
            image={`/logos/${post.frontMatter.image}`}
            alt={post.frontMatter.title}
          />
        </Link>
        <CardContent>
          <Typography variant="body1" component="div">
            <Link href={`/tips/${post.slug}`}>
              {post.frontMatter.title}
            </Link>
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {post.frontMatter.date}
          </Typography>
          <Typography variant="body2">
            {post.frontMatter.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;