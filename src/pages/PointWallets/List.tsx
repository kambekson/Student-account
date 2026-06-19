import { PointWallet } from "@/entities/PointWallet";
import { Box } from "@mui/material";
import { PointWalletDisplay } from "./Display";

interface PointWalletsListProps {
  pointWallets: PointWallet[];
  onClick?: (pointWallet: PointWallet) => void;
}

export const PointWalletsList: React.FC<PointWalletsListProps> = ({
  pointWallets,
  onClick,
}) => {
  return (
    <Box>
      {pointWallets.map((pointWallet) => (
        <PointWalletDisplay
          key={pointWallet.id}
          pointWallet={pointWallet}
          onClick={
            onClick ? (pointWallet) => onClick(pointWallet) : undefined
          }
        />
      ))}
    </Box>
  );
};
