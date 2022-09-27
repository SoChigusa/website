import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "./Link";

const PostCard = ({ post }) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ height: '100%' }}>
        <Link href={`/tips/${post.slug}`}>
          <a>
            <CardMedia
              component='img'
              style={{ height: 120, width: '88%', padding: '6%', objectFit: 'contain' }}
              image={`/logos/${post.frontMatter.image}`}
              alt={post.frontMatter.title}
            />
          </a>
        </Link>
        <CardContent>
          <Typography variant="body1" component="div">
            <Link href={`/tips/${post.slug}`}>
              <a>
                {post.frontMatter.title}
              </a>
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