import { useState } from "react";
import useLocale from "../../utils/useLocale";
import createHeaderData from "../../utils/createHeaderData";
import extractTalkData from "../../utils/extractTalkData";
import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import GoBackButton from "../../components/GoBackButton";
import ArticlesMeta from "../../components/meta/articles";
import TalkList from "../../components/TalkList";
import { GetStaticPropsContext } from "next";

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const headerData = createHeaderData();
  const talk_list: TalkList = await extractTalkData({});
  return { props: { headerData, talk_list }, };
}

const TalksFilters = ({ t, handle, handleChange }: { t: any, handle: any, handleChange: any }) => {
  if (handle.filter == 'talk') {
    return (
      <Stack>
        <FormControl>
          <FormLabel id='talk-types'>
            <Typography variant="h6">
              {t.TALK_TYPES}
            </Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  inputProps={{ 'aria-label': t.ORAL }}
                  onChange={handleChange.oral}
                  checked={handle.oral}
                />
              }
              label={t.ORAL}
            />
            <FormControlLabel
              control={
                <Checkbox
                  inputProps={{ 'aria-label': t.POSTER }}
                  onChange={handleChange.poster}
                  checked={handle.poster}
                />
              }
              label={t.POSTER}
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <FormLabel id='talks-invitations'>
            <Typography variant="h6">{t.INVITATIONS}
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="talks-invitations"
            value={handle.invitation}
            name='talks-invitations'
            onChange={handleChange.invitation}
            row
          >
            <FormControlLabel
              value='all'
              control={<Radio />}
              label={t.ALL}
            />
            <FormControlLabel
              value='invited'
              control={<Radio />}
              label={t.INVITED}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id='conference-types'>
            <Typography variant="h6">
              {t.CONFERENCE_TYPES}
            </Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  inputProps={{ 'aria-label': t.INTERNATIONAL }}
                  onChange={handleChange.international}
                  checked={handle.international}
                />
              }
              label={t.INTERNATIONAL}
            />
            <FormControlLabel
              control={
                <Checkbox
                  inputProps={{ 'aria-label': t.DOMESTIC }}
                  onChange={handleChange.domestic}
                  checked={handle.domestic}
                />
              }
              label={t.DOMESTIC}
            />
          </FormGroup>
        </FormControl>
      </Stack>
    );
  } else {
    return (<></>);
  }
};

const Talks = ({ headerData, talk_list }: { headerData: any, talk_list: any }) => {
  const { t } = useLocale();

  // filters
  const [filter, setFilter] = useState('all');
  const handleChangeFilter = (event: any) => {
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

  // invitations
  const [invitation, setInvitation] = useState('all');
  const handleChangeInvitation = (event: any) => {
    setInvitation(event.target.value);
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
        title={t.TALKS_TITLE}
        description={t.TALKS_DESCRIPTION}
        url="/research/talks"
        img=""
      />
      <Typography gutterBottom variant="h4">
        {t.TALKS_AND_AWARDS}
      </Typography>
      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel id='talks-filter'>
              <Typography variant="h6">{t.FILTER}
              </Typography>
            </FormLabel>
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
          <TalksFilters
            t={t}
            handle={{ filter: filter, oral: oral, poster: poster, invitation: invitation, international: international, domestic: domestic }}
            handleChange={{ filter: handleChangeFilter, oral: handleChangeOral, poster: handleChangePoster, invitation: handleChangeInvitation, international: handleChangeInternational, domestic: handleChangeDomestic }}
          />
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
        <TalkList talks={talk_list.all} filters={[filter, oral, poster, invitation, international, domestic]} />
        <GoBackButton gutterLeft gutterBottom href='../research' />
      </Box>
    </>
  );
}

export default Talks;