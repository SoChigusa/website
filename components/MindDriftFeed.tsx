import { Box } from "@mui/material";

const MIND_DRIFT_EMBED_URL =
  "https://adhd-sage.vercel.app/embed/so-chigusa-jqzvqs";

const MindDriftFeed = () => (
  <Box sx={{ mb: 4 }}>
    <Box
      component="iframe"
      loading="lazy"
      src={MIND_DRIFT_EMBED_URL}
      title="公開されたつぶやき"
      sx={{
        border: 0,
        borderRadius: { xs: "18px", sm: "24px" },
        display: "block",
        height: { xs: 420, sm: 500 },
        overflow: "hidden",
        width: "100%",
      }}
    />
  </Box>
);

export default MindDriftFeed;
