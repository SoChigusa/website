const extractTalkData = async ({ slice = -1, separate = false } = {}) => {
  const json = await fetch('https://script.google.com/macros/s/AKfycbxkUPyRs4Iqo9UiE6pJyrdvtYfIrk3rQK-3mAbn-RO02qGymDmqTKh1UytrXN2PcZw-FA/exec', { method: 'GET' }).then(data => {
    return data.json();
  });
  if (separate) {
    let seminars = json.filter(talk => talk.Type == 'Seminar').reverse();
    let talks = json.filter(talk => (talk.Type != 'Seminar' && talk.Type != 'Award')).reverse();
    let awards = json.filter(talk => talk.Type == 'Award');
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