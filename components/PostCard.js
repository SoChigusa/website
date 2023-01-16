import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "./Link";

const PostCard = ({ post, isIndexPage = false }) => {
  let xs, sm, md;
  if (isIndexPage) { // layout for index.js
    xs = 12;
    sm = 12;
    md = 6;
  } else { // layout for tips.js
    xs = 6;
    sm = 4;
    md = 3;
  }

  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <Card sx={{ height: '100%' }}>
        <Link href={`/tips/${post.slug}`}>
          <CardMedia
            component='img'
            style={{ height: 120, width: '88%', padding: '6%', objectFit: 'contain' }}
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