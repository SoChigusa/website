import { AccessTime } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { deformAuthorNames, latexReplacement, mathjaxInline } from "../utils/deformPublicationData";
import Link from "./Link";

const ABSTRACT_MAX_LENGTH = 300

const NewestPublication = ({ publication }) => {
  const authorOrig = publication.entryTags.AUTHOR;
  const titleOrig = publication.entryTags.TITLE.slice(1, -1);
  const eprint = publication.entryTags.EPRINT;
  const date = publication.entryTags.date;
  const noimage = 'https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image'

  // shrink abstract
  var abstract = mathjaxInline(publication.entryTags.abstract)
  abstract = abstract.substr(0, ABSTRACT_MAX_LENGTH);
  abstract = abstract.substr(0, Math.min(abstract.length, abstract.lastIndexOf(" "))) + '...';

  // from [Family], [First] to [First] [Family]
  const author = deformAuthorNames(authorOrig);

  // replace specific latex commands in my paper titles
  const title = latexReplacement(titleOrig);

  return (
    <Card sx={{ width: '100%', boxShadow: 0 }}>
      <Link href={`https://arxiv.org/abs/${eprint}`} target='_blank'>
        <CardMedia
          component='img'
          sx={{ height: { md: 280, lg: 360 }, width: '76%', px: '12%', pt: 2, pb: '0', objectFit: 'contain' }}
          image={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
          alt='newest publication'
        />
      </Link>
      <CardContent sx={{ width: '94%', px: '3%' }}>
        <Link href={`https://arxiv.org/abs/${eprint}`} target='_blank'>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Link>
        <Typography variant="body1" component="div" gutterBottom>
          {author}
        </Typography>
        <Typography variant="body1" color='text.secondary' component="div">
          {abstract}
        </Typography>
        <Stack spacing={1} direction='row' sx={{ mt: 1 }}>
          <AccessTime sx={{ fontSize: 15, mt: '3px', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" component="div">
            {date}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NewestPublication;