import { Box, ButtonBase, Card, CardContent, Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import ArticlesMeta from '../components/meta/articles';
import createHeaderData from '../utils/createHeaderData';
import loadImageCaptions, { LocalizedImageCaption } from '../utils/loadImageCaptions';
import useLocale from '../utils/useLocale';

interface ImageCaptionsPageProps {
  headerData: HeaderData;
  imageCaptions: LocalizedImageCaption[];
}

export const getStaticProps: GetStaticProps<ImageCaptionsPageProps> = async ({ locale }) => {
  const headerData = createHeaderData();
  const imageCaptions = loadImageCaptions(locale === 'ja' ? 'ja' : 'en');

  return {
    props: {
      headerData,
      imageCaptions,
    },
  };
};

export default function ImageCaptions({ imageCaptions }: ImageCaptionsPageProps) {
  const { t } = useLocale();
  const [selectedImage, setSelectedImage] = useState<LocalizedImageCaption | null>(null);
  const closeImageDialog = () => setSelectedImage(null);

  return (
    <>
      <ArticlesMeta
        title={t.IMAGE_CAPTIONS_TITLE}
        description={t.IMAGE_CAPTIONS_DESCRIPTION}
        url="/image-captions"
        img={imageCaptions[0]?.src ?? ''}
      />

      <Box component="section" sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography component="h1" gutterBottom variant="h4">
          {t.IMAGE_CAPTIONS}
        </Typography>
        <Typography
          color="text.secondary"
          component="p"
          sx={{ fontSize: '0.875rem', mb: 3, mt: -0.5 }}
        >
          {t.IMAGE_CAPTIONS_DISCLAIMER}
        </Typography>

        {imageCaptions.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              py: { xs: 8, sm: 12 },
              px: 3,
              textAlign: 'center',
              color: 'text.secondary',
              bgcolor: 'grey.50',
            }}
          >
            <Typography>{t.IMAGE_CAPTIONS_EMPTY}</Typography>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            {imageCaptions.map((item, index) => (
              <Grid item key={item.fileName} xs={12} sm={6} md={4} lg={3}>
                <Card
                  component="article"
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'box-shadow 180ms ease, transform 180ms ease',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <ButtonBase
                    aria-label={`${t.IMAGE_CAPTIONS_OPEN_IMAGE}: ${item.alt}`}
                    onClick={() => setSelectedImage(item)}
                    sx={{
                      aspectRatio: '1 / 1',
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
                      '&:hover img, &:focus-visible img': { transform: 'scale(1.04)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      sx={{
                        display: 'block',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 220ms ease',
                        width: '100%',
                      }}
                    />
                  </ButtonBase>
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                      px: 2,
                      py: 1.5,
                      '&:last-child': { pb: 1.5 },
                    }}
                  >
                    <Typography component="p" sx={{ lineHeight: 1.65, overflowWrap: 'anywhere' }}>
                      {item.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog
        aria-labelledby="image-caption-dialog-title"
        BackdropProps={{ sx: { backgroundColor: 'rgba(47, 52, 56, 0.82)' } }}
        fullWidth
        maxWidth={false}
        onClose={(_event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            closeImageDialog();
          }
        }}
        open={selectedImage !== null}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            m: { xs: 1, sm: 3 },
            maxHeight: '94vh',
            maxWidth: 'min(96vw, 1400px)',
            overflow: 'visible',
          },
        }}
      >
        {selectedImage ? (
          <DialogContent onClick={closeImageDialog} sx={{ cursor: 'pointer', p: 0 }}>
            <Box
              component="img"
              src={selectedImage.src}
              alt={selectedImage.alt}
              onClick={(event) => event.stopPropagation()}
              sx={{
                cursor: 'default',
                display: 'block',
                height: 'auto',
                maxHeight: 'calc(94vh - 68px)',
                maxWidth: '100%',
                mx: 'auto',
                objectFit: 'contain',
                width: 'auto',
              }}
            />
            <Typography
              color="common.white"
              component="p"
              id="image-caption-dialog-title"
              sx={{ lineHeight: 1.65, m: 0, pt: 1.5, textAlign: 'center' }}
            >
              {selectedImage.comment}
            </Typography>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
