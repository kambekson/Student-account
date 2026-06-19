import React from "react";
import { Card, CardContent, Box, Typography, Avatar } from "@mui/material";
import { PointWallet } from "@/Common/Entity/Base/Point";
import { useTranslation } from "react-i18next";

interface PointWalletDisplayProps {
  pointWallet: PointWallet;
  onClick?: (pointWallet: PointWallet) => void;
}

export const PointWalletDisplay: React.FC<PointWalletDisplayProps> = ({
  pointWallet,
  onClick,
}) => {
  const { t } = useTranslation();

  const pointType = pointWallet.pointType;

  const handleClick = () => {
    if (onClick) {
      onClick(pointWallet);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--color-background)",
        borderLeft: "4px solid var(--color-accent)",
        color: "var(--color-text)",
        mb: 1.5,
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.2s ease, background-color 0.2s ease",
        "&:hover": {
          boxShadow: onClick ? 3 : undefined,
        },
      }}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          py: 1.5,
        }}
      >
        <Avatar
          src={pointType?.pointFile?.url}
          alt={pointType?.name}
          sx={{
            width: 40,
            height: 40,
            mr: 2,
            bgcolor: "var(--color-inactive)",
          }}
        />

        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "var(--color-text)" }}
          >
            {pointType?.name || t("Неизвестный тип")}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--color-text-2)" }}>
            {t("Баланс")}: {pointWallet.points}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
