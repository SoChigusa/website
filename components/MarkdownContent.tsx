import { Snackbar, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';
import useLocale from '../utils/useLocale';

export default function MarkdownContent({ html }: { html: string }) {
  const { t } = useLocale();
  const [feedback, setFeedback] = useState<{ message: string, key: number } | null>(null);

  const copyCode = async (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button.code-copy-button');
    if (!button || !event.currentTarget.contains(button)) return;
    const code = button.closest('.code-block-container')?.querySelector('pre > code');
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code.textContent ?? '');
      setFeedback({ message: t.CODE_COPIED, key: Date.now() });
    } catch {
      setFeedback({ message: t.CODE_COPY_FAILED, key: Date.now() });
    }
  };

  return (
    <>
      <Typography variant='body1' component='div' onClick={copyCode} dangerouslySetInnerHTML={{ __html: html }} />
      <Snackbar
        key={feedback?.key}
        open={feedback !== null}
        autoHideDuration={4000}
        message={feedback?.message}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') setFeedback(null);
        }}
      />
    </>
  );
}
