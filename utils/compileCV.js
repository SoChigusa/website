import fs from 'fs';
import latexmk from 'node-latexmk';

const deformTalkInformation = ({ talks, format }) => {
  let header = "";
  if (format == 'award')
    header = `\\begin{table}[h]\\begin{tabular}{ll}`;
  else
    header = `\\begin{enumerate}`;
  const talks_src = talks.map(talk => {
    if (format == 'award')
      return `${talk.Title} \& ${talk.Date} \\\\`;
    else if (format == 'seminar')
      return `\\item \`\`${talk.Title}\'\', ${talk.Date}, ${talk.Place}`;
    else if (format == 'talk')
      return `\\item \`\`${talk.Title}\'\', ${talk.Date}, ${talk.Conference}, ${talk.Place}`;
  });
  let footer = "";
  if (format == 'award')
    footer = `\\end{tabular}\\end{table}`;
  else
    footer = `\\end{enumerate}`;
  return header + talks_src.join() + footer;
};

const compileCV = ({ seminars, talks, awards }) => {
  var latex_src = fs.readFileSync('research/cv_template.tex', 'utf-8');

  // current age
  const now = new Date();
  const birthday = new Date('1992/5/22');
  const age = now.getFullYear() - birthday.getFullYear() + (
    new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate()).getTime()
      > now.getTime() ? -1 : 0
  );
  latex_src = latex_src.replace('\% Age here', `Age: \& ${age} \\\\`);

  // talks and awards
  const IOs = talks.filter(talk => talk.Type == 'International-Oral');
  const IPs = talks.filter(talk => talk.Type == 'International-Poster');
  const DOs = talks.filter(talk => talk.Type == 'Domestic-Oral');
  const DPs = talks.filter(talk => talk.Type == 'Domestic-Poster');
  latex_src = latex_src.replace('\% Awards here', deformTalkInformation({
    talks: awards, format: 'award'
  }));
  latex_src = latex_src.replace('\% Seminars here', deformTalkInformation({
    talks: seminars, format: 'seminar'
  }));
  latex_src = latex_src.replace('\% International Oral here', deformTalkInformation({
    talks: IOs, format: 'talk'
  }));
  latex_src = latex_src.replace('\% International Poster here', deformTalkInformation({
    talks: IPs, format: 'talk'
  }));
  latex_src = latex_src.replace('\% Domestic Oral here', deformTalkInformation({
    talks: DOs, format: 'talk'
  }));
  latex_src = latex_src.replace('\% Domestic Poster here', deformTalkInformation({
    talks: DPs, format: 'talk'
  }));

  // save src for later convenience
  const tmp_path = 'research/cv.tex';
  fs.writeFileSync(tmp_path, latex_src);

  // compile and write pdf
  latexmk(tmp_path, 'public/cv.pdf', err => {
    if (err)
      console.log(err);
    else
      console.log("cv.pdf generated successfully!");
  });

  // copy file for ja locale
  fs.copyFileSync("public/cv.pdf", "public/ja/cv.pdf");

  return { age: age };
};

export default compileCV;