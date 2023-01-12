import { useState } from "react";
import useLocale from "../../utils/useLocale";
import createHeaderData from "../../utils/createHeaderData";
import extractTalkData from "../../utils/extractTalkData";
import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import GoBackButton from "../../components/GoBackButton";
import ArticlesMeta from "../../components/meta/articles";
import TalkList from "../../components/TalkList";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const all_talks = await extractTalkData();
  return { props: { headerData, all_talks }, };
}

const Talks = ({ headerData, all_talks }) => {
  const { t } = useLocale();

  // filters
  const [filter, setFilter] = useState('all');
  const is_disabled = 'disable'
  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  // talk types
  const [oral, setOral] = useState(true);
  const [poster, setPoster] = useState(true);
  const handleChangeOral = () => {
    setOral(!oral);
  };
  const handleChangePoster = () => {
    setPoster(!poster);
  };

  // conference types
  const [international, setInternational] = useState(true);
  const [domestic, setDomestic] = useState(true);
  const handleChangeInternational = () => {
    setInternational(!international);
  };
  const handleChangeDomestic = () => {
    setDomestic(!domestic);
  };

  return (
    <>
      <ArticlesMeta
        title="Talks by So Chigusa"
        description="Summary of talks by So Chigusa"
        url="/research/talks"
        img=""
      />
      <Typography gutterBottom variant="h4">
        {t.TALKS_AND_AWARDS}
      </Typography>
      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel id='talks-filter'>{t.FILTER}</FormLabel>
            <RadioGroup
              aria-labelledby="talks-filter"
              value={filter}
              name='talks-filter'
              onChange={handleChangeFilter}
              row
            >
              <FormControlLabel value='all' control={<Radio />} label={t.ALL} />
              <FormControlLabel value='seminar' control={<Radio />} label={t.SEMINARS} />
              <FormControlLabel value='talk' control={<Radio />} label={t.TALKS} />
              <FormControlLabel value='award' control={<Radio />} label={t.AWARDS} />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id='talk-types'>{t.TALK_TYPES}</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': t.ORAL }}
                    onChange={handleChangeOral}
                    checked={oral}
                    disabled={(filter != 'talk')}
                  />
                }
                label={t.ORAL}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': t.POSTER }}
                    onChange={handleChangePoster}
                    checked={poster}
                    disabled={(filter != 'talk')}
                  />
                }
                label={t.POSTER}
              />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormLabel id='conference-types'>{t.CONFERENCE_TYPES}</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': t.INTERNATIONAL }}
                    onChange={handleChangeInternational}
                    checked={international}
                    disabled={(filter != 'talk')}
                  />
                }
                label={t.INTERNATIONAL}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': t.DOMESTIC }}
                    onChange={handleChangeDomestic}
                    checked={domestic}
                    disabled={(filter != 'talk')}
                  />
                }
                label={t.DOMESTIC}
              />
            </FormGroup>
          </FormControl>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
        <TalkList talks={all_talks} icon filters={[filter, oral, poster, international, domestic]} />
        <GoBackButton gutterLeft gutterBottom href='../research' />
      </Box>
    </>
  );
}

export default Talks;