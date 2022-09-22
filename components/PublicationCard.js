import { MathJax } from "better-react-mathjax";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Like from '../components/Like';
import Link from "./Link";
import Image from "next/image";

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
  title = title.replace('\\textendash{}', '-');
  return title;
}

const mathjaxInline = (latex) => {
  let pieces = latex.split('\$');
  let i = -1;
  const n = pieces.length;
  pieces = pieces.map(piece => {
    i++;
    if (i == n - 1) { return piece; }
    return (i % 2 == 0 ? piece + '\\(' : piece + '\\)');
  });
  return pieces.join('');
}

const PublicationCard = ({ publication }) => {
  const authorOrig = publication.entryTags.AUTHOR;
  const titleOrig = publication.entryTags.TITLE.slice(1, -1);
  const eprint = publication.entryTags.EPRINT;
  const date = publication.entryTags.date;
  const abstract = mathjaxInline(publication.entryTags.abstract);
  const noimage = 'https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image'

  // from [Family], [First] to [First] [Family]
  const author = deformAuthorNames(authorOrig);

  // replace specific latex commands in my paper titles
  const title = mathjaxInline(latexReplacement(titleOrig));


  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={title}
        id={title}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle1" color="primary">
            {title} [{eprint}]
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {author} ({date})
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ width: '40%' }}>
            <CardMedia
              component='img'
              style={{ height: 360, width: '94%', padding: '3%', objectFit: 'contain' }}
              image={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
              alt={title}
            />
          </Box>
          <Box sx={{ width: '60%' }}>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Abstract
              </Typography>
              <Typography gutterBottom variant="body1">
                <MathJax >
                  {abstract}
                </MathJax>
              </Typography>
              <Box sx={{ float: 'right', marginBottom: 2, marginRight: 2 }}>
                <Stack spacing={2} direction='row'>
                  <Link href={`https://arxiv.org/abs/${eprint}`} target="_blank">
                    {/* <Button variant="contained">
                      Open arXiv
                    </Button> */}
                    <Image
                      src='/logos/ArXiv_logo_2022.png'
                      width={80}
                      height={36}
                      style={{ paddingTop: 4 }}
                    />
                  </Link>
                  <Like />
                </Stack>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </AccordionDetails>
    </Accordion >
  );
};

export default PublicationCard;