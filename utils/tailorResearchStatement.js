import fs from 'fs';

const mapID2URL = bbl => {
  const items = bbl.split('\\bibitem\{');
  const id2url = items.map(item => {
    const urls = item.split('\\href\{');
    if (urls.length > 1) {
      const substrings1 = item.split('\}');
      const substrings2 = urls[urls.length - 1].split('\}');
      return {
        id: substrings1[0],
        url: substrings2[0]
      };
    } else {
      return null;
    }
  }).filter(entry => entry !== null);
  return id2url;
}

const tailorResearchStatement = () => {

  // open and copy files
  var latex_src = fs.readFileSync('research/research_statement.tex', 'utf-8');
  var bbl_src = fs.readFileSync('research/research_statement.bbl', 'utf-8');
  const pdf = fs.readFileSync('research/research_statement.pdf');
  fs.writeFileSync('public/rs.pdf', pdf);
  fs.writeFileSync('public/ja/rs.pdf', pdf);
  console.log('copied the research statement to the public directory')

  // replace citations to links
  const id2url = mapID2URL(bbl_src);
  id2url.map((info, index) => {
    const citeitem = '\\cite\{' + info['id'] + '\}';
    const linkitem = '<a href="' + info['url'] + '" target="_blank">[' + (index + 1).toString() + ']</a>';
    latex_src = latex_src.replaceAll(citeitem, linkitem);
  });

  // strip the main text
  const documentIndex = latex_src.indexOf('\\begin{document}');
  latex_src = latex_src.substring(documentIndex);
  var lines = latex_src.split('\n');
  lines = lines.filter(line => !line.includes('\\begin{document}'));
  lines = lines.filter(line => !line.includes('\\maketitle'));
  lines = lines.filter(line => !line.includes('\\bibliography'));
  lines = lines.filter(line => !line.includes('\\end{document}'));

  // short summary for research page
  const subsectionPositions = lines
    .map((line, index) => line.includes('\\subsection*{') ? index : null)
    .filter(entry => entry !== null);
  const latex_summary = lines.slice(0, subsectionPositions[0]).join('\n');

  // extract contents and section titles
  const extractTitle = pos => lines[pos].replace('\\subsection*{', '').replace('}', '');
  const extractContent = (pos, index) => {
    var content;
    if (index == subsectionPositions.length - 1) {
      content = lines.slice(pos + 1, lines.length).join('\n')
    } else {
      content = lines.slice(pos + 1, subsectionPositions[index + 1]).join('\n')
    }
    return content.split('\n\n');
  };
  const latex_statement = subsectionPositions
    .map((pos, index) => ({
      title: extractTitle(pos),
      content: extractContent(pos, index)
    }));

  return [latex_summary, latex_statement];
};

export default tailorResearchStatement;