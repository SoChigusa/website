const extractTalkData = async ({ slice = -1, separate = false } = {}) => {
  const json = await fetch('https://script.google.com/macros/s/AKfycbxWGRs44fr2ZfokuqmOOVsgWlYpi9d_6h7Z6C5GRCyEweVxY50F3TH-bRZrOG6OaF1R9w/exec', { method: 'GET' }).then(data => {
    return data.json();
  });
  if (separate) {
    let seminars = json.filter(talk => talk.Type == 'Seminar').reverse();
    let talks = json.filter(talk => (talk.Type != 'Seminar' && talk.Type != 'Award')).reverse();
    let awards = json.filter(talk => talk.Type == 'Award').reverse();
    if (slice >= 0) {
      seminars = seminars.slice(0, slice);
      talks = talks.slice(0, slice);
    }
    return [seminars, talks, awards];
  } else {
    let all_talks = json.reverse();
    if (slice >= 0) {
      all_talks = all_talks.slice(0, slice);
    }
    return all_talks;
  }
}

export default extractTalkData;