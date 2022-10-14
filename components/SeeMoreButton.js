import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import useLocale from "../utils/useLocale";
import Link from "./Link";

const SeeMoreButton = ({ href }) => {
  const { t } = useLocale();
  return (
    <Link href={href}>
      <Tooltip title={t.SEE_MORE} placement="bottom" arrow>
        <IconButton aria-label={t.SEE_MORE} sx={{ marginLeft: 1, marginBottom: 1 }}>
          <MoreHoriz />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default SeeMoreButton;