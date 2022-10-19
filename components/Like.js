import { useState } from 'react';
import useLocale from '../utils/useLocale';
import updateCounter from '../utils/db/updateCounter';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

const Like = ({ sx, initialCount = 0, eprint }) => {
  const { t } = useLocale();
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const handleLike = async () => {
    setCount(isLiked ? count - 1 : count + 1);
    setIsLiked(!isLiked);
    await updateCounter({ n: isLiked ? -1 : 1, eprint: eprint });
  };

  return (
    <Box sx={sx}>
      <Tooltip title={t.LIKE} placement="bottom" arrow>
        <IconButton
          aria-label='like'
          color='error'
          onClick={handleLike}
        >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>
      <Typography variant='caption' color='error'>
        {count}
      </Typography>
    </Box>
  );
};

export default Like;