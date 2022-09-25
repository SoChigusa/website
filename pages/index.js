import { Box, Grid, Typography } from "@mui/material";
import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import Activity from '../components/Activity';
import IndexMeta from '../components/meta';
import TemporalAlert from "../components/TemporalAlert";
import PublicationCard from "../components/PublicationCard";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData({ slice: 6 });
  return { props: { headerData, publications }, };
}

export default function Home({ headerData, publications }) {
  return (
    <>
      <IndexMeta />
      <TemporalAlert />
      <Typography gutterBottom variant="h4">
        Recent activities
      </Typography>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={2}>
          {publications.map((publication) => (
            <PublicationCard key={publication.citationKey} publication={publication} />
          ))}
        </Grid>
      </Box>
    </>
    // <Container>
    //   <IndexMeta />
    //   <Stack gap={3}>
    //     <TemporalAlert />
    //     <h2 className={styles.subject}>
    //       Recent research activities
    //       <Button variant="primary">See More</Button>
    //     </h2>
    //     <Row className="justify-content-center">
    //       <Col md="auto">
    //         <Activity type="Talk" subtitle="PPC 2022 @ St. Louis" subject="Upper bound on the smuon mass from vacuum stability in the light of muon g−2 anomaly" date="2022/6/7" />
    //       </Col>
    //       <Col md="auto">
    //         <Activity type="Seminar" subtitle="The University of Tokyo" subject="Quantum Simulations of Dark Sector Showers" date="2022/5/23" />
    //       </Col>
    //     </Row>
    //     <Row className="justify-content-center">
    //       <Col md="auto">
    //         <Activity type="Paper" subtitle="arXiv:2204.12500" author="So Chigusa, Masahito Yamazaki" subject="Quantum Simulations of Dark Sector Showers" date="2022/4" />
    //       </Col>
    //       <Col md="auto">
    //         <Activity type="Paper" subtitle="arXiv:2203.08062" author="So Chigusa, Takeo Moroi, Yutaro Shoji" subject="Upper bound on the smuon mass from vacuum stability in the light of muon g-2 anomaly" date="2022/3" />
    //       </Col>
    //     </Row>
    //   </Stack>
    // </Container>
  );
}
