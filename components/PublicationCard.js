import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "./Link";

const deformAuthorNames = (authors) => {
  const authorList = authors.split(' and ');
  const authorListNew = authorList.map((author) => {
    const names = author.split(', ');
    return `${names[1]} ${names[0]}`;
  })
  return authorListNew.join(', ');
};

const latexReplacement = (titleOrig) => {
  let title = titleOrig;
  title = title.replace(' \\ensuremath{-} ', '-');
  title = title.replace('$pp$', 'pp');
  title = title.replace('\\textendash{}', '-');
  return title;
}

const PublicationCard = ({ publication }) => {
  const authorOrig = publication.entryTags.AUTHOR;
  const titleOrig = publication.entryTags.TITLE.slice(1, -1);
  const eprint = publication.entryTags.EPRINT;
  const noimage = 'https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image'

  // from [Family], [First] to [First] [Family]
  const author = deformAuthorNames(authorOrig);

  // replace specific latex commands in my paper titles
  const title = latexReplacement(titleOrig);

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card sx={{ height: '100%' }}>
        <Link href={`https://arxiv.org/abs/${eprint}`} target="_blank">
          <CardMedia
            component='img'
            style={{ height: 360, width: '94%', padding: '3%', objectFit: 'contain' }}
            image={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
            alt={title}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <Link href={`https://arxiv.org/abs/${eprint}`} target="_blank">
              {title}
            </Link>
          </Typography>
          <Typography variant="body2">
            {author}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PublicationCard;