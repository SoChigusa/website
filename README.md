This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## note articles

The Japanese Tips list shows up to six recent articles from [So Chigusa's note](https://note.com/sochigusa).
The Japanese desktop Tips menu and mobile navigation combine note and local articles, showing the six most recent by date.
The English site shows only local articles and does not request the note feed.

`pages/api/note-posts.ts` fetches the public RSS on the server, with a five-second timeout and a ten-minute CDN cache.
The shared SWR hook loads the list in the browser and checks for updates every ten minutes while the page is visible.
New posts require no rebuild or manual registration. A failed refresh keeps articles already loaded in the browser;
if the first request fails, the Tips list still provides a link to the note profile and the menu shows local articles.

Change the profile URL or refresh interval in `utils/notePosts.ts`.
No API key is required. Hosting must support Next.js API routes (for example, Vercel); a static export alone is insufficient.
See [note's RSS documentation](https://www.help-note.com/hc/ja/articles/4402395202841) for the feed's publication limits.
