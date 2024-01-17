import { ReadMore } from "@mui/icons-material";
import { Button } from "@mui/material";
import useLocale from "../utils/useLocale";
import Link from "./Link";

const SeeMoreButton = ({ href }: { href: string }) => {
  const { t } = useLocale();
  return (
    <Link href={href}>
      <Button variant="outlined" startIcon={<ReadMore />}>
        {t.SEE_MORE}
      </Button>
    </Link>
  );
};

export default SeeMoreButton;