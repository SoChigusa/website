import fs from "fs";
import { toJSON } from "bibtex-parser-js";
import parse, { HTMLElement } from "node-html-parser";

const extractPublicationData = async ({ slice = -1 }) => {
  const materials: Materials[] = JSON.parse(fs.readFileSync(`research/materials.json`, 'utf-8'));
  const eprints: string[] = materials.map(material => material.eprint);
  const bib: string = fs.readFileSync(`research/publications.bib`, 'utf-8');
  let publications: Publication[] = (slice >= 0 ? toJSON(bib).slice(0, slice) : toJSON(bib));

  // constrain the number of requests to MAX_NUMBER_OF_REQUEST
  const MAX_NUMBER_OF_REQUEST = 3
  const num_pub = publications.length;
  let cnt = 0;
  let promises: Promise<void>[] = [];
  for (let i = 0; i < MAX_NUMBER_OF_REQUEST; i++) {
    let p = new Promise<void>((resolve) => {
      (async function loop(index) {

        if (index < num_pub) {
          let publication = publications[index];
          const eprint: string = publication.entryTags.EPRINT;
          publication.entryTags.isExist = !(typeof eprint === "undefined");
          let path = `/publicationImages/${eprint}.svg`;
          if (publication.entryTags.isExist) {
            const html: string = await fetch(`https://arxiv.org/abs/${publication.entryTags.EPRINT}`).then((data) => {
              return data.text();
            });
            const root: HTMLElement = parse(html);
            const metas: HTMLElement[] = root.querySelectorAll('meta');
            const meta_date: HTMLElement = metas.filter(meta => meta.rawAttributes.name == 'citation_date')[0];
            const date: string = meta_date.rawAttributes.content;
            const meta_abstract: HTMLElement = metas.filter(meta => meta.rawAttributes.name == 'citation_abstract')[0];
            const abstract: string = meta_abstract.rawAttributes.content;
            publication.entryTags.date = date;
            publication.entryTags.abstract = abstract;
          } else { // specific for non-arXiv papers
            publication.entryTags.isExist = true;
            publication.entryTags.date = publication.entryTags.DATE ? publication.entryTags.DATE : "";
            publication.entryTags.abstract = publication.entryTags.ABSTRACT ? publication.entryTags.ABSTRACT : "";
            path = `/publicationImages/${publication.entryTags.IMAGEID}.svg`;
          }

          // image existance check
          if (fs.existsSync(`public${path}`)) {
            publication.entryTags.imagePath = path;
          } else {
            publication.entryTags.imagePath = "noimage";
          }

          // additional materials
          const i = eprints.indexOf(eprint);
          if (i !== -1) {
            if ('YouTube' in materials[i]) {
              publication.YouTube = materials[i].YouTube;
            }
            if ('posterName' in materials[i]) {
              publication.posterName = materials[i].posterName;
            }
            if ('slideName' in materials[i]) {
              publication.slideName = materials[i].slideName;
            }
          }

          // save
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

  // avoid papers w/o preprints such as PhD thesis
  publications = publications.filter((publication: any) => publication.entryTags.isExist);
  return publications;
}

export default extractPublicationData;