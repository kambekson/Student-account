import { FC } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PointWallet } from "@/Common/Entity/Base/Point";
import { PointWalletsList } from "./List";
import { useTranslation } from "react-i18next";

interface PointWalletsContentProps {
  pointWallets: PointWallet[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onClick?: (pointWallet: PointWallet) => void;
}

export const PointWalletsContent: FC<PointWalletsContentProps> = ({
  pointWallets,
  hasNextPage,
  isFetchingNextPage,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <PointWalletsList pointWallets={pointWallets} onClick={onClick} />

      {hasNextPage && (
        <Box display="flex" justifyContent="center" py={2}>
          {isFetchingNextPage ? (
            <div className="loading-overlay">
              <CircularProgress color="primary" size={60} />
            </div>
          ) : (
            <Typography variant="body2" color="textSecondary">
              {t("Прокрутите вниз для загрузки")}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};
