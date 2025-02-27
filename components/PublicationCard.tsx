import useLocale from '../utils/useLocale';
import { MathJax } from "better-react-mathjax";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
// import Like from './Like';
import Link from "./Link";
import Image from "next/image";
import { deformAuthorNames, latexReplacement, mathjaxInline } from "../utils/deformPublicationData";
import { Article, Science } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SummarizeIcon from '@mui/icons-material/Summarize';

const PublicationCard = ({ publication, expanded, handle }: { publication: Publication, expanded?: boolean, handle?: AccordionOnChange }) => {
  const { t } = useLocale();

  // extract publication information
  const authorOrig: string = publication.entryTags.AUTHOR;
  const titleOrig: string = publication.entryTags.TITLE.slice(1, -1);
  const eprint: string | undefined = publication.entryTags.EPRINT;
  const date: string = publication.entryTags.date;
  const abstract: string = mathjaxInline(publication.entryTags.abstract);
  const noimage: string = 'https://placehold.jp/32/003060/e0e0e0/286x180.png?text=No Image';
  const url: string | undefined = publication.entryTags.URL;

  // from [Family], [First] to [First] [Family]
  const author: string = deformAuthorNames(authorOrig);

  // replace specific latex commands in my paper titles
  const title: string = mathjaxInline(latexReplacement(titleOrig));

  const YouTubeLink = () => {
    if ('YouTube' in publication) {
      const href = publication.YouTube as string;
      return (
        <Link href={href} target="_blank">
          <Tooltip title={t.WATCH_ON_YOUTUBE} placement="bottom" arrow>
            <Box sx={{ mt: '4px' }}>
              <Image
                src='/logos/YouTube_Logo_2017.svg'
                width={100}
                height={32}
                alt='YouTube logo'
              />
            </Box>
          </Tooltip>
        </Link>
      );
    } else {
      return <></>;
    }
  };

  const PosterLink = () => {
    if ('posterName' in publication) {
      return (
        <Link href={`/posters/${publication.posterName}.pdf`} target="_blank">
          <Tooltip title={t.SHOW_POSTER} placement="bottom" arrow>
            <IconButton aria-label={t.SHOW_POSTER}>
              <NewspaperIcon />
            </IconButton>
          </Tooltip>
        </Link>
      );
    } else {
      return <></>;
    }
  }

  const SlideLink = () => {
    if ('slideName' in publication) {
      return (
        <Link href={`/slides/${publication.slideName}.pdf`} target="_blank">
          <Tooltip title={t.SHOW_SLIDE} placement="bottom" arrow>
            <IconButton aria-label={t.SHOW_SLIDE}>
              <SummarizeIcon />
            </IconButton>
          </Tooltip>
        </Link>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Accordion expanded={expanded} onChange={handle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={title}
        id={title}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle1" color="primary">
            {title} {eprint ? `[arXiv: ${eprint}]` : ""}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {author} ({date})
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Card>
          <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ width: { xs: '100%', sm: '85%', md: '40%', lg: '40%' }, mx: 'auto', my: 'auto' }}>
              <CardMedia
                component='img'
                sx={{ height: { md: 360, lg: 360 }, width: '94%', padding: '3%', objectFit: 'contain' }}
                image={publication.entryTags.imagePath === "noimage" ? noimage : publication.entryTags.imagePath}
                alt={title}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '60%', lg: '60%' } }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {t.ABSTRACT}
                </Typography>
                <Typography gutterBottom variant="body1">
                  <MathJax>
                    {abstract}
                  </MathJax>
                </Typography>
                <Box sx={{ float: 'right', marginBottom: 2, marginRight: 2 }}>
                  <Stack spacing={2} direction='row'>
                    <YouTubeLink />
                    <PosterLink />
                    <SlideLink />
                    {eprint ?
                      <Link href={`https://arxiv.org/pdf/${eprint}.pdf`} target="_blank">
                        <Tooltip title={t.OPEN_PDF} placement="bottom" arrow>
                          <IconButton aria-label={t.OPEN_PDF}>
                            <Article />
                          </IconButton>
                        </Tooltip>
                      </Link> : <></>}
                    {eprint ?
                      <Link href={`https://arxiv.org/abs/${eprint}`} target="_blank">
                        <Tooltip title={t.SEE_ON_ARXIV} placement="bottom" arrow>
                          <Box sx={{ mt: '4px' }}>
                            <Image
                              src='/logos/ArXiv_logo_2022.png'
                              width={80}
                              height={36}
                              alt='arXiv logo'
                            />
                          </Box>
                        </Tooltip>
                      </Link> :
                      <Link href={url ? url : "/404"} target="_blank">
                        <Tooltip title={t.SEE_ON_PUBLISHER} placement="bottom" arrow>
                          <IconButton aria-label={t.SEE_ON_PUBLISHER}>
                            <Science />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    }
                    {/* <Like id={{ collection: 'publications', document: eprint }} /> */}
                  </Stack>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        </Card>
      </AccordionDetails>
    </Accordion >
  );
};

export default PublicationCard;