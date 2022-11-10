import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from "swr";
import useLocale from '../utils/useLocale';
import getCounter from '../utils/db/getCounter';
import updateCounter from '../utils/db/updateCounter';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

const fetcher = async ({ apiKey, eprint }) => {
  const counterData = await getCounter({ eprint });
  const ipData = await fetch(apiKey).then(res => res.json());
  return { counterData, ipData };
};

const Like = ({ sx, eprint }) => {
  const { data } = useSWR({ apiKey: '/api/getIp', eprint }, fetcher);
  const ip = data ? data.ipData.ip : '127.0.0.1';
  const likes = data ? data.counterData.likes : 0;
  const likedUsers = data ? data.counterData.likedUsers : [];

  const { t } = useLocale();
  const [isLiked, setIsLiked] = useState(likedUsers.includes(ip));
  const [count, setCount] = useState(likes);

  useEffect(() => {
    if (data) {
      const newLikes = data.counterData.likes;
      const newIsLiked = likedUsers.includes(ip);
      setCount(newLikes);
      setIsLiked(newIsLiked);
    }
  }, [data]);

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