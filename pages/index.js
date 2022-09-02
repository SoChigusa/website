import createHeaderData from "../utils/createHeaderData";
import Layout from "../components/layout";
import Activity from '../components/activity';
import { Row, Col, Button, Container, Stack } from 'react-bootstrap';
import styles from '../styles/utils.module.css';
import IndexMeta from '../components/meta';

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

export default function Home({ headerData }) {
  return (
    <Layout headerData={headerData}>
      <Container>
        <IndexMeta />
        <Stack gap={3}>
          <h2 className={styles.subject}>
            Recent research activities
            <Button variant="primary">See More</Button>
          </h2>
          <Row className="justify-content-center">
            <Col md="auto">
              <Activity type="Talk" subtitle="PPC 2022 @ St. Louis" subject="Upper bound on the smuon mass from vacuum stability in the light of muon g−2 anomaly" date="2022/6/7" />
            </Col>
            <Col md="auto">
              <Activity type="Seminar" subtitle="The University of Tokyo" subject="Quantum Simulations of Dark Sector Showers" date="2022/5/23" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="auto">
              <Activity type="Paper" subtitle="arXiv:2204.12500" author="So Chigusa, Masahito Yamazaki" subject="Quantum Simulations of Dark Sector Showers" date="2022/4" />
            </Col>
            <Col md="auto">
              <Activity type="Paper" subtitle="arXiv:2203.08062" author="So Chigusa, Takeo Moroi, Yutaro Shoji" subject="Upper bound on the smuon mass from vacuum stability in the light of muon g-2 anomaly" date="2022/3" />
            </Col>
          </Row>
        </Stack>
      </Container>
    </Layout>
  );
}
