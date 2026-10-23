const formatArticleDate = (date: string, locale: string | undefined): string => (
  new Date(date).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  })
);

export default formatArticleDate;
