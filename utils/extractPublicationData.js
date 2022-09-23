import fs from "fs";
import { toJSON } from "bibtex-parser-js";
import parse from "node-html-parser";

const extractPublicationData = async ({ slice = -1 } = {}) => {
  const bib = fs.readFileSync(`research/publications.bib`, 'utf-8');
  let publications = (slice >= 0 ? toJSON(bib).slice(0, slice) : toJSON(bib));

  // constrain the number of requests to MAX_NUMBER_OF_REQUEST
  const MAX_NUMBER_OF_REQUEST = 5
  const num_pub = publications.length;
  let cnt = 0;
  let promises = [];
  for (let i = 0; i < MAX_NUMBER_OF_REQUEST; i++) {
    let p = new Promise((resolve) => {
      (async function loop(index) {

        if (index < num_pub) {
          let publication = publications[index];
          const eprint = publication.entryTags.EPRINT
          const isExist = fs.existsSync(`public/publicationImages/${eprint}.svg`);
          publication.entryTags["imageExist"] = isExist;

          const html = await fetch(`https://arxiv.org/abs/${publication.entryTags.EPRINT}`).then((data) => {
            return data.text();
          });
          const root = parse(html);
          const metas = root.querySelectorAll('meta');
          const meta_date = metas.filter(meta => meta.rawAttributes.name == 'citation_date')[0];
          const date = meta_date.rawAttributes.content;
          const meta_abstract = metas.filter(meta => meta.rawAttributes.name == 'citation_abstract')[0];
          const abstract = meta_abstract.rawAttributes.content;
          publication.entryTags["date"] = date;
          publication.entryTags["abstract"] = abstract;
          publications[index] = publication;

          // next
          loop(cnt++);
          return;
        }
        resolve();

      })(cnt++);
    });
    promises.push(p);
  }
  await Promise.all(promises);

  return publications;
}

export default extractPublicationData;