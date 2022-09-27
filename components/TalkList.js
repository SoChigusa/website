import { EmojiEvents, Mic, MoreHoriz, SpeakerPhone } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import Link from "./Link";

const TalkList = ({ talks, seeMore = false, filters = ['all', true, true, true, true] } = []) => {
  const see_more_if_any = (!seeMore ? '' : (
    <Link href='research/talks'>
      <Tooltip title='See more' placement="bottom" arrow>
        <IconButton aria-label="see more" sx={{ marginLeft: 1, marginBottom: 1 }}>
          <MoreHoriz />
        </IconButton>
      </Tooltip>
    </Link>
  ));

  // filter talk information
  const [filter, oral, poster, international, domestic] = filters;
  let filtered = talks;
  if (filter == 'seminar') filtered = filtered.filter(talk => talk.Type == 'Seminar');
  else if (filter == 'award') filtered = filtered.filter(talk => (talk.Type == 'Award'));
  else if (filter == 'talk') {
    filtered = filtered.filter(talk => (talk.Type != 'Seminar' && talk.Type != 'Award'));
    if (!oral) filtered = filtered.filter(talk => (!talk.Type.match('Oral')));
    if (!poster) filtered = filtered.filter(talk => (!talk.Type.match('Poster')));
    if (!international) filtered = filtered.filter(talk => (!talk.Type.match('International')));
    if (!domestic) filtered = filtered.filter(talk => (!talk.Type.match('Domestic')));
  }

  return (
    <>
      <List dense sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
        {filtered.map(talk => {
          const award = (talk.Type == 'Award');
          const seminar = (talk.Type == 'Seminar');
          if (seminar) {
            return (
              <ListItem>
                <ListItemIcon>
                  <Mic color="secondary" />
                </ListItemIcon>
                <ListItemText primary={talk.Title} secondary={`${talk.Place} (${talk.Date})`} />
              </ListItem>
            );
          } else if (award) {
            return (
              <ListItem>
                <ListItemIcon>
                  <EmojiEvents color="warning" />
                </ListItemIcon>
                <ListItemText primary={talk.Title} secondary={`${talk.Date}`} />
              </ListItem>
            )
          } else {
            return (
              <ListItem>
                <ListItemIcon>
                  <SpeakerPhone color="primary" />
                </ListItemIcon>
                <ListItemText primary={talk.Title} secondary={`${talk.Conference} \@ ${talk.Place} (${talk.Date})`} />
              </ListItem>
            );
          }
        })
        }
        {see_more_if_any}
      </List>
    </>
  )
}

export default TalkList;