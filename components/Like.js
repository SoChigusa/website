import { Favorite } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';

const Like = ({ ip }) => {
  const [count, setCount] = useState(0);
  const handleLike = () => {
    setCount(count + 1);
  }

  return (
    <Button
      variant='contained'
      color='error'
      startIcon={<Favorite />}
      sx={{ marginBottom: 2 }}
      onClick={handleLike}
    >
      {count}
    </Button>
  );
};

export default Like;