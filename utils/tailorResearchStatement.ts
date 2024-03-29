import fs from 'fs';

const mapID2URL = (bbl: string): MapID2URL[] => {
  const items: string[] = bbl.split('\\bibitem\{');
  const id2url: MapID2URL[] = items.map(item => {
    const urls: string[] = item.split('\\href\{');
    if (urls.length > 1) {
      const substrings1: string[] = item.split('\}');
      const substrings2: string[] = urls[urls.length - 1].split('\}');
      return {
        id: substrings1[0],
        url: substrings2[0]
      };
    } else {
      return {
        id: 'undefined',
        url: 'undefined'
      }
    }
  }).filter(entry => entry.id !== 'undefined');
  return id2url;
}

const replaceLaTeX = (latex_src: string, from: string, to: string) => {
  let latex_res = latex_src
  const items: string[] = latex_src.split(`\\${from}\{`);
  const contents: string[] = items.slice(1).map(item => {
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
  let latex_src: string = fs.readFileSync('research/research_statement.tex', 'utf-8');
  let bbl_src: string = fs.readFileSync('research/research_statement.bbl', 'utf-8');
  const pdf: Buffer = fs.readFileSync('research/research_statement.pdf');
  fs.writeFileSync('public/rs.pdf', pdf);
  fs.writeFileSync('public/ja/rs.pdf', pdf);
  console.log('copied the research statement to the public directory')

  // replace citations to links
  const id2url: MapID2URL[] = mapID2URL(bbl_src);
  id2url.map((info, index) => {
    const citeitem = '\\cite\{' + info['id'] + '\}';
    const linkitem = '<a href="' + info['url'] + '" target="_blank">[' + (index + 1).toString() + ']</a>';
    latex_src = latex_src.replaceAll(citeitem, linkitem);
  });

  // replace italic words to html format
  latex_src = replaceLaTeX(latex_src, 'textit', 'i');
  latex_src = replaceLaTeX(latex_src, 'textbf', 'b');

  // strip the main text
  const documentIndex: number = latex_src.indexOf('\\begin{document}');
  latex_src = latex_src.substring(documentIndex);
  let lines: string[] = latex_src.split('\n');
  lines = lines.filter(line => !line.includes('\\begin{document}'));
  lines = lines.filter(line => !line.includes('\\maketitle'));
  lines = lines.filter(line => !line.includes('\\bibliography'));
  lines = lines.filter(line => !line.includes('\\end{document}'));

  // short summary for research page
  const subsectionPositions: number[] = lines
    .map((line, index) => line.includes('\\subsection*{') ? index : -1)
    .filter(entry => entry != -1);
  const summary: string = lines.slice(0, subsectionPositions[0]).join('\n');

  // extract contents and section titles
  const extractTitle = (pos: number): string => lines[pos].replace('\\subsection*{', '').replace('}', '');
  const extractContents = (pos: number, index: number): string[] => {
    let content: string;
    if (index == subsectionPositions.length - 1) {
      content = lines.slice(pos + 1, lines.length).join('\n')
    } else {
      content = lines.slice(pos + 1, subsectionPositions[index + 1]).join('\n')
    }
    return content.split('\n\n');
  };
  const statements: Statement[] = subsectionPositions
    .map((pos, index) => ({
      title: extractTitle(pos!),
      contents: extractContents(pos!, index)
    }));

  return { summary, statements };
};

export default tailorResearchStatement;