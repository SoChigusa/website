import createHeaderData from "../utils/createHeaderData";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

const cv = () => {
  return (
    <div>
      Provide CV here
    </div>
  )
};

export default cv;