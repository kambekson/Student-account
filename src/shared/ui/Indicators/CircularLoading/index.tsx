import { CircularProgress } from "@mui/material";

import "./style.css";

const CircularLoading = () => {
  return (
    <div className="circular-loading">
      <CircularProgress color="primary" />
    </div>
  );
};

export default CircularLoading;
