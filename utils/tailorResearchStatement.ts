import fs from 'fs';

type MapID2URL = (bbl: string) => Array<any>;
const mapID2URL: MapID2URL = (bbl) => {
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
      return undefined;
    }
  }).filter(entry => entry !== undefined);
  return id2url;
}

const replaceLaTeX = (latex_src: string, from: string, to: string) => {
  var latex_res = latex_src
  const items = latex_src.split(`\\${from}\{`);
  const contents = items.slice(1).map(item => {
    const substring = item.split('\}');
    return substring[0];
  });
  contents.map(content => {
    const latex = `\\${from}\{${content}\}`;
    const html = `<${to}>${content}</${to}>`;
    latex_res = latex_res.replace(latex, html);
  });
  return latex_res;
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

  // replace italic words to html format
  latex_src = replaceLaTeX(latex_src, 'textit', 'i');
  latex_src = replaceLaTeX(latex_src, 'textbf', 'b');

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
    .map((line, index) => line.includes('\\subsection*{') ? index : undefined)
    .filter(entry => entry !== undefined);
  const latex_summary = lines.slice(0, subsectionPositions[0]).join('\n');

  // extract contents and section titles
  const extractTitle = (pos: number) => lines[pos].replace('\\subsection*{', '').replace('}', '');
  const extractContent = (pos: number, index: number) => {
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
      title: extractTitle(pos!),
      content: extractContent(pos!, index)
    }));

  return [latex_summary, latex_statement];
};

export default tailorResearchStatement;