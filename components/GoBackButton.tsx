import useLocale from "../utils/useLocale";
import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";
import { IconButton, Link, Tooltip } from "@mui/material";
import React from "react";

const GoBackButton = ({ gutterLeft = false, gutterBottom = false, browserBack = false, href = '../' }: { gutterLeft?: boolean, gutterBottom?: boolean, browserBack?: boolean, href?: string }) => {
  const { t } = useLocale();

  // margin left / bottom adjustment
  const ml = (gutterLeft ? 1 : 0);
  const mb = (gutterBottom ? 5 : 1);
  const router = useRouter();

  if (browserBack) {
    return (
      <Tooltip title={t.GO_BACK} placement="bottom" arrow>
        <IconButton
          aria-label={t.GO_BACK}
          sx={{ ml: ml, mb: mb }}
          onClick={() => router.back()}
        >
          <ArrowBack />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Link href={href}>
        <Tooltip title={t.GO_BACK} placement="bottom" arrow>
          <IconButton aria-label={t.GO_BACK} sx={{ ml: ml, mb: mb }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
      </Link>
    );
  }
};

export default GoBackButton;