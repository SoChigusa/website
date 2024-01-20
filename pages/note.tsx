import createHeaderData from "../utils/createHeaderData";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  return { props: { headerData, }, };
}

export default function Home({ headerData }: { headerData: HeaderData }) {
  return (
    <>
      <ArticlesMeta
        title="Notes and slides by So Chigusa"
        description="Summary of notes and slides written by So Chigusa"
        url="/note"
        img=""
      />
      <TemporalAlert />
      <span> Summarize notes and slides here </span>
    </>
  );
}