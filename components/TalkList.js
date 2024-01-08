import { EmojiEvents, Mic, SpeakerPhone } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SeeMoreButton from './SeeMoreButton';

const TalkList = ({ talks, seeMore = false, filters = ['all', true, true, 'all', true, true] } = []) => {
  // filter talk information
  const [filter, oral, poster, invitation, international, domestic] = filters;
  let filtered = talks;
  if (filter == 'seminar') filtered = filtered.filter(talk => talk.Type == 'Seminar');
  else if (filter == 'award') filtered = filtered.filter(talk => (talk.Type == 'Award'));
  else if (filter == 'talk') {
    filtered = filtered.filter(talk => (talk.Type != 'Seminar' && talk.Type != 'Award'));
    if (!oral) filtered = filtered.filter(talk => (!talk.Type.match('Oral')));
    if (!poster) filtered = filtered.filter(talk => (!talk.Type.match('Poster')));
    if (invitation == 'invited') filtered = filtered.filter(talk => (talk.Invited == 'true' || talk.Symposium == 'true'));
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
              <ListItem key={talk.Title + talk.Date}>
                <ListItemIcon>
                  <Mic color="secondary" />
                </ListItemIcon>
                <ListItemText primary={talk.Title} secondary={`${talk.Place} (${talk.Date})`} />
              </ListItem>
            );
          } else if (award) {
            return (
              <ListItem key={talk.Title + talk.Date}>
                <ListItemIcon>
                  <EmojiEvents color="warning" />
                </ListItemIcon>
                <ListItemText primary={talk.Title} secondary={`${talk.Date}`} />
              </ListItem>
            )
          } else {
            let note = '';
            if (talk.Symposium === 'true')
              note = ' (Symposium talk)';
            else if (talk.Invited === 'true')
              note = ' (Invited)';
            return (
              <ListItem key={talk.Title + talk.Date}>
                <ListItemIcon>
                  <SpeakerPhone color="primary" />
                </ListItemIcon>
                <ListItemText primary={talk.Title + note} secondary={`${talk.Conference} \@ ${talk.Place} (${talk.Date})`} />
              </ListItem>
            );
          }
        })
        }
        {(!seeMore ? '' : (
          <SeeMoreButton href='research/talks' />
        ))}
      </List>
    </>
  )
}

export default TalkList;