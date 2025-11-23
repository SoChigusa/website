import useLocale from "../utils/useLocale";
import { Tooltip } from "@mui/material";
import Link from "./Link";
import { styled } from '@mui/material/styles';

const PrimaryIcon = styled('i')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const InspireHEPButton = () => {
  const { t } = useLocale();
  return (
    <Link href="https://inspirehep.net/authors/1474093#with-citation-summary" target='_blank' >
      <Tooltip title={t.SEE_ON_INSPIRE_HEP} placement="bottom" arrow>
        <PrimaryIcon className="ai ai-inspire-square ai-2x" />
      </Tooltip >
    </Link >
  )
};

export default InspireHEPButton;