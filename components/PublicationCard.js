import { MathJax } from "better-react-mathjax";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Like from '../components/Like';
import Link from "./Link";
import Image from "next/image";
import { deformAuthorNames, latexReplacement, mathjaxInline } from "../utils/deformPublicationData";

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
            {title} [arXiv: {eprint}]
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {author} ({date})
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>

        {/* Card for >= medium size window */}
        <Card sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box sx={{ width: { md: '50%', lg: '40%' }, my: 'auto' }}>
            <CardMedia
              component='img'
              sx={{ height: { md: 280, lg: 360 }, width: '94%', padding: '3%', objectFit: 'contain' }}
              image={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
              alt={title}
            />
          </Box>
          <Box sx={{ width: { md: '50%', lg: '60%' } }}>
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

        {/* Card for (extra) small size window */}
        <Card sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Box sx={{ width: '100%' }}>
            <CardMedia
              component='img'
              sx={{ width: 360, paddingTop: '2%', mx: 'auto', objectFit: 'contain' }}
              image={publication.entryTags.imageExist ? `/publicationImages/${eprint}.svg` : noimage}
              alt={title}
            />
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