import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "./Link";

const PostCard = ({ post }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%' }}>
        <Link href={`/tips/${post.slug}`}>
          <a>
            <CardMedia
              component='img'
              style={{ height: 240, width: '94%', padding: '3%', objectFit: 'contain' }}
              image={`/logos/${post.frontMatter.image}`}
              alt={post.frontMatter.title}
            />
          </a>
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link href={`/tips/${post.slug}`}>
              <a>
                {post.frontMatter.title}
              </a>
            </Link>
          </Typography>
          <Typography variant="h7" color="text.secondary">
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