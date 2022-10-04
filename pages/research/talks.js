import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import GoBackButton from "../../components/GoBackButton";
import ArticlesMeta from "../../components/meta/articles";
import TalkList from "../../components/TalkList";
import createHeaderData from "../../utils/createHeaderData";
import extractTalkData from "../../utils/extractTalkData";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const all_talks = await extractTalkData();
  return { props: { headerData, all_talks }, };
}

const Talks = ({ headerData, all_talks }) => {
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
        Talks and Awards
      </Typography>
      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel id='talks-filter'>Filter</FormLabel>
            <RadioGroup
              aria-labelledby="talks-filter"
              value={filter}
              name='talks-filter'
              onChange={handleChangeFilter}
              row
            >
              <FormControlLabel value='all' control={<Radio />} label='All' />
              <FormControlLabel value='seminar' control={<Radio />} label='Seminars' />
              <FormControlLabel value='talk' control={<Radio />} label='Talks' />
              <FormControlLabel value='award' control={<Radio />} label='Awards' />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id='talk-types'>Talk types</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': 'Oral' }}
                    onChange={handleChangeOral}
                    checked={oral}
                    disabled={(filter != 'talk')}
                  />
                }
                label='Oral'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': 'Poster' }}
                    onChange={handleChangePoster}
                    checked={poster}
                    disabled={(filter != 'talk')}
                  />
                }
                label='Poster'
              />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormLabel id='conference-types'>Conference types</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': 'International' }}
                    onChange={handleChangeInternational}
                    checked={international}
                    disabled={(filter != 'talk')}
                  />
                }
                label='International'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': 'Domestic' }}
                    onChange={handleChangeDomestic}
                    checked={domestic}
                    disabled={(filter != 'talk')}
                  />
                }
                label='Domestic (Japan)'
              />
            </FormGroup>
          </FormControl>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
        <TalkList talks={all_talks} icon filters={[filter, oral, poster, international, domestic]} />
        <GoBackButton gutterLeft gutterBottom href='/research' />
      </Box>
    </>
  );
}

export default Talks;