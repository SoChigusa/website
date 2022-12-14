import createHeaderData from "../utils/createHeaderData";
import useLocale from "../utils/useLocale";
import ArticlesMeta from "../components/meta/articles";
import CVTable from "../components/CVTable";
import Link from "../components/Link";
import { Button, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Article } from "@mui/icons-material";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

const createData = (name, content) => {
  return { name: name, content: content };
};

const cv = () => {
  const { t } = useLocale();
  const rows_personal_data_1 = [
    createData(t.NAME_FIRST, t.NAME_FIRST_CONTENT),
    createData(t.NAME_SECOND, t.NAME_SECOND_CONTENT),
    createData(t.DATE_OF_BIRTH, t.DATE_OF_BIRTH_CONTENT),
    createData(t.PLACE_OF_BIRTH, t.PLACE_OF_BIRTH_CONTENT),
    createData(t.NATIONALITY, t.NATIONALITY_CONTENT),
    createData(t.AGE, 30),
    createData(t.SEX, t.SEX_CONTENT),
  ];
  const rows_personal_data_2 = [
    createData(t.AFFILIATION, t.AFFILIATION_CONTENT),
    createData(t.POSTCODE, '94720-8099'),
    createData(t.ADDRESS, '1 Cyclotron Rd, Berkeley, CA'),
    createData(t.PHONE, '+1-510-486-4000'),
    createData(t.EMAIL, 'SoChigusa[at]lbl.gov'),
    createData(t.WEBPAGE, 'https://website-sochigusa.vercel.app/'),
  ];
  const rows_education = [
    createData(t.EDUCATION_DOCTOR_DATE, t.EDUCATION_DOCTOR),
    createData(t.EDUCATION_MASTER_DATE, t.EDUCATION_MASTER),
    createData(t.EDUCATION_BACHELOR_DATE, t.EDUCATION_BACHELOR),
  ];
  const rows_professional_experience = [
    createData(t.PE_3_DATE, t.PE_3_CONTENT),
    createData(t.PE_2_DATE, t.PE_2_CONTENT),
    createData(t.PE_1_DATE, t.PE_1_CONTENT),
  ];
  const rows_teaching_experience = [
    createData(t.TE_1_DATE, t.TE_1_CONTENT),
  ];
  const rows_grants = [
    createData(t.GRANT_1_DATE, t.GRANT_1_CONTENT),
    createData(t.GRANT_2_DATE, t.GRANT_2_CONTENT),
    createData(t.GRANT_3_DATE, t.GRANT_3_CONTENT),
  ];
  const rows_honors_and_awards = [
    createData('1.', t.HA_1_CONTENT),
    createData('2.', t.HA_2_CONTENT),
  ];

  return (
    <>
      <ArticlesMeta
        title="CV of So Chigusa"
        description="CV of So Chigusa"
        url="/cv"
        img=""
      />
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <CVTable title={t.PERSONAL_DATA} rows={rows_personal_data_1} />
          <CVTable rows={rows_personal_data_2} />
          <CVTable title={t.EDUCATION} rows={rows_education} />
          <CVTable title={t.PROFESSIONAL_EXPERIENCES} rows={rows_professional_experience} />
          <CVTable title={t.TEACHING_EXPERIENCES} rows={rows_teaching_experience} />
          <CVTable title={t.GRANTS} rows={rows_grants} />
          <CVTable title={t.HONORS_AND_AWARDS} rows={rows_honors_and_awards} />
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h5">
              {t.RESEARCH_ACHIEVEMENTS}
            </Typography>
            <Link href="./research">
              <Button variant="contained">
                {t.SEE_RESEARCH_ACTIVITIES}
              </Button>
            </Link >
          </Grid>
        </Grid>
        <a href="/cv.pdf">
          <Tooltip title={t.OPEN_CV_PDF} placement="bottom" arrow>
            <IconButton aria-label={t.OPEN_PDF}>
              <Article />
            </IconButton>
          </Tooltip>
        </a>
      </Stack>
    </>
  )
};

export default cv;