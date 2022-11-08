import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from "swr";
import useLocale from '../utils/useLocale';
import updateCounter from '../utils/db/updateCounter';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

const Like = ({ sx, likes = 0, likedUsers = [], eprint }) => {
  const fetcher = url => fetch(url).then(res => res.json());
  const { data } = useSWR('/api/getIp', fetcher);
  const ip = data ? data.ip : '127.0.0.1';

  const { t } = useLocale();
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(likes);

  useEffect(() => {
    setIsLiked(likedUsers.includes(ip));
  }, []);

  const handleLike = async () => {
    if (data) {
      if (isLiked) {
        setCount(count - 1);
        likedUsers.splice(likedUsers.indexOf(ip), 1);
      } else {
        setCount(count + 1);
        likedUsers.push(ip);
      }
      setIsLiked(!isLiked);
      await updateCounter({ n: isLiked ? -1 : 1, likedUsers, eprint });
    }
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