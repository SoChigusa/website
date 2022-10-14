import useLocale from "../utils/useLocale";
import { Button } from "@mui/material";
import Link from "./Link";

const InspireHEPButton = () => {
  const { t } = useLocale();
  return (
    <Link href="https://inspirehep.net/authors/1474093#with-citation-summary" target='_blank' >
      <Button variant="contained">
        {t.SEE_ON_INSPIRE_HEP}
      </Button>
    </Link >
  )
};

export default InspireHEPButton;