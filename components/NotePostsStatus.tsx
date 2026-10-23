import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import useLocale from '../utils/useLocale';

const NotePostsStatus = ({ loading, hasPosts, failed = false }: {
  loading: boolean;
  hasPosts: boolean;
  failed?: boolean;
}) => {
  const { t } = useLocale();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowLoading(false);
      return;
    }

    const timeout = window.setTimeout(() => setShowLoading(true), 500);
    return () => window.clearTimeout(timeout);
  }, [loading]);

  if (loading && showLoading) {
    return (
      <Box role="status" aria-live="polite" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 2 }}>
        <CircularProgress size={14} color="inherit" aria-hidden="true" />
        <Typography variant="body2">{hasPosts ? t.NOTE_ARTICLES_REFRESHING : t.NOTE_ARTICLES_LOADING}</Typography>
      </Box>
    );
  }

  if (failed && !hasPosts && !loading) {
    return <Typography role="status" color="text.secondary" variant="body2" sx={{ mb: 2 }}>{t.NOTE_ARTICLES_UNAVAILABLE}</Typography>;
  }

  return null;
};

export default NotePostsStatus;
