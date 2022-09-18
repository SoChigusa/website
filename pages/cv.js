import createHeaderData from "../utils/createHeaderData";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

const cv = () => {
  return (
    <>
      <ArticlesMeta
        title="CV of So Chigusa"
        description="CV of So Chigusa"
        url="/cv"
        img=""
      />
      <TemporalAlert />
      <span>Provide CV here</span>
    </>
  )
};

export default cv;