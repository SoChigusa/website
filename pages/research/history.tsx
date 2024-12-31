import useLocale from "../../utils/useLocale";
import createHeaderData from "../../utils/createHeaderData";
import { Box, Stack, Typography } from "@mui/material";
import ArticlesMeta from "../../components/meta/articles";
import { GetStaticProps } from "next";
import { tailorRSHistory } from "../../utils/tailorResearchStatement";
import { MathJax } from "better-react-mathjax";
import StatementCard from "../../components/StatementCard";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  const latex_RS_history: LatexRS[] = tailorRSHistory();
  return { props: { headerData, latex_RS_history }, };
}

const History = ({ latex_RS_history }: MyPageProps) => {
  const { t } = useLocale();

  return (
    <>
      <ArticlesMeta
        title={t.RESEARCH_TITLE}
        description={t.RESEARCH_DESCRIPTION}
        url="/research"
        img=""
      />
      <Typography gutterBottom variant="h4">
        {t.RS_HISTORY}
      </Typography>
      {
        latex_RS_history.map(latex_RS => (
          <Box sx={{ flexGrow: 1 }} key={latex_RS.year}>
            <Typography gutterBottom variant="h5">
              {t.RESEARCH_INTERESTS} ({latex_RS.year})
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
              <Stack spacing={1}>
                <MathJax>
                  <Typography gutterBottom variant="body1" dangerouslySetInnerHTML={{ __html: latex_RS.summary }} />
                </MathJax>
                <Box>
                  {latex_RS.statements.map(statement => (
                    <StatementCard key={statement.title} statement={statement} />
                  ))}
                </Box>
              </Stack>
            </Box>
          </Box>
        ))
      }
    </>
  )
};

export default History;