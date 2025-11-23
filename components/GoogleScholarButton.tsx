import useLocale from "../utils/useLocale";
import Link from "./Link";
import { Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';

const PrimaryIcon = styled('i')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const GoogleScholarButton = () => {
  const { t } = useLocale();
  return (
    <Link href="https://scholar.google.com/citations?user=2nGFimkAAAAJ&hl=ja" target='_blank' >
      <Tooltip title={t.SEE_ON_GOOGLESCHOLAR} placement="bottom" arrow>
        <PrimaryIcon className="ai ai-google-scholar-square ai-2x" />
      </Tooltip >
    </Link >
  )
};

export default GoogleScholarButton;