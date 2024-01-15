const deformAuthorNames = (authors: string) => {
  const authorList = authors.split(' and ');
  const authorListNew = authorList.map((author) => {
    const names = author.split(', ');
    return `${names[1]} ${names[0]}`;
  })
  return authorListNew.join(', ');
};

const latexReplacement = (titleOrig: string) => {
  let title = titleOrig;
  title = title.replace(' \\ensuremath{-} ', '-');
  title = title.replace('\\textendash{}', '-');
  return title;
}

const mathjaxInline = (latex: string) => {
  let pieces = latex.split('\$');
  let i = -1;
  const n = pieces.length;
  pieces = pieces.map((piece: string) => {
    i++;
    if (i == n - 1) { return piece; }
    return (i % 2 == 0 ? piece + '\\(' : piece + '\\)');
  });
  return pieces.join('');
}

export { deformAuthorNames, latexReplacement, mathjaxInline };