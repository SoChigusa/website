import createHeaderData from "../utils/createHeaderData";
import { Container, Stack } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

const cv = () => {
  return (
    <Container>
      <ArticlesMeta
        title="CV of So Chigusa"
        description="CV of So Chigusa"
        url=""
        img=""
      />
      <Stack gap={3}>
        <TemporalAlert />
      </Stack>
      <span>Provide CV here</span>
    </Container>
  )
};

export default cv;