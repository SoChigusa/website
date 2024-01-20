import createHeaderData from "../utils/createHeaderData";
import useLocale from "../utils/useLocale";
import ArticlesMeta from "../components/meta/articles";
import Link from "../components/Link";
import RepositoryCard from "../components/RepositoryCard";
import { Stack, Typography } from "@mui/material";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  return { props: { headerData, }, };
};

export default function Home() {
  const { t } = useLocale();
  return (
    <>
      <ArticlesMeta
        title={t.REPOSITORIES_TITLE}
        description={t.REPOSITORIES_DESCRIPTION}
        url="/repositories"
        img=""
      />

      <Typography gutterBottom variant="h4">
        {t.PUBLIC_REPOSITORIES}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h5">
          {t.REPOSITORIES_PUBLIC_CODES}
        </Typography>
        <RepositoryCard
          name="ELVAS"
          href="https://github.com/YShoji-HEP/ELVAS"
          imgType="jpeg"
        >
          <>
            {t.ELVAS_DESCRIPTION_1}
            <br />
            {t.ELVAS_DESCRIPTION_2} <Link href="https://arxiv.org/abs/1707.09301" target="_blank">1707.09301</Link> {t.ELVAS_AND} <Link href="https://arxiv.org/abs/1803.03902" target="_blank">1803.03902</Link> {t.ELVAS_DESCRIPTION_3}
          </>
          <>
            {t.ELVAS_ACKNOWLEGEMENT_1} <Link href="https://commons.wikimedia.org/wiki/File:Elvas_(30792921230).jpg" target="_blank">Wikipedia</Link>
            <br />
            {t.ELVAS_ACKNOWLEGEMENT_2} <Link href="https://inspirehep.net/authors/1471799?ui-citation-summary=true&ui-exclude-self-citations=true" target="_blank">{t.ELVAS_YUTARO}</Link> {t.ELVAS_ACKNOWLEGEMENT_3}
          </>
        </RepositoryCard>

        <Typography variant="h5">
          {t.REPOSITORIES_RESEARCH_TOOLS}
        </Typography>
        <RepositoryCard
          name="Dimensions"
          href="https://dimensions-sochigusa.vercel.app"
          imgType="png"
        >
          <>
            {t.DIMENSIONS_DESCRIPTION}
          </>
        </RepositoryCard>
        <RepositoryCard
          name="LaTeX2Grammarly"
          href="https://github.com/SoChigusa/Latex2Grammarly"
          imgType="svg"
        >
          <>
            {t.L2G_DESCRIPTION}
          </>
        </RepositoryCard>
      </Stack>
    </>
  )
}