import { CircularProgress } from "@mui/material";

import "@/Presentation/Styles/circularLoading.scss";

const CircularLoading = () => {
  return (
    <div className="circular-loading">
      <CircularProgress color="primary" />
    </div>
  );
};

export default CircularLoading;
