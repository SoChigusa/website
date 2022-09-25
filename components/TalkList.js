import { EmojiEvents, Mic, SpeakerPhone } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const TalkList = ({ talks } = []) => {
  return (
    <>
      <List dense sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
        {talks.map(talk => {
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
      </List>
    </>
  )
}

export default TalkList;