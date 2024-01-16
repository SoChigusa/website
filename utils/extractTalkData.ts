const extractTalkData = async ({ slice = -1 }) => {
  let json: Talk[] = await fetch('https://script.google.com/macros/s/AKfycbxWGRs44fr2ZfokuqmOOVsgWlYpi9d_6h7Z6C5GRCyEweVxY50F3TH-bRZrOG6OaF1R9w/exec', { method: 'GET' }).then(data => {
    return data.json();
  });
  json = json.filter(talk => talk.Type != '');

  let all_talks: Talk[] = json.reverse();
  let seminars: Talk[] = json.filter(talk => talk.Type == 'Seminar').reverse();
  let talks: Talk[] = json.filter(talk => (talk.Type != 'Seminar' && talk.Type != 'Award')).reverse();
  let awards: Talk[] = json.filter(talk => talk.Type == 'Award').reverse();
  if (slice >= 0) {
    all_talks = all_talks.slice(0, slice);
    seminars = seminars.slice(0, slice);
    talks = talks.slice(0, slice);
  }

  let talkList: TalkList = {
    all: all_talks,
    seminars: seminars,
    talks: talks,
    awards: awards
  };
  return talkList;
}

export default extractTalkData;