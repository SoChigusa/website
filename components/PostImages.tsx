import { Box, SxProps, Theme } from '@mui/material';

const PostImages = ({ images, sx = [] }: { images: PostImage[], sx?: SxProps<Theme> }) => (
  <Box
    sx={[
      {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'minmax(0, 1fr)',
        alignItems: 'center',
        gap: 2,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {images.map(({ src, alt }) => (
      <Box
        key={src}
        component='img'
        src={`/logos/${src}`}
        alt={alt}
        sx={{ display: 'block', width: '100%', height: '100%', minHeight: 0, objectFit: 'contain' }}
      />
    ))}
  </Box>
);

export default PostImages;
