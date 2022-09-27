import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";
import { backdropClasses, IconButton, Link, Tooltip } from "@mui/material";

const GoBackButton = ({ gutterLeft = false, gutterBottom = false, browserBack = false, href } = {}) => {
  // margin left / bottom adjustment
  const ml = (gutterLeft ? 1 : 0);
  const mb = (gutterBottom ? 5 : 1);
  const router = useRouter();

  if (browserBack) {
    return (
      <Tooltip title='Go back' placement="bottom" arrow>
        <IconButton
          aria-label="go back"
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
        <Tooltip title='Go back' placement="bottom" arrow>
          <IconButton aria-label="go back" sx={{ ml: ml, mb: mb }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
      </Link>
    );
  }
};

export default GoBackButton;