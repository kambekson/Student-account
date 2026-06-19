import { PointWallet } from "@/entities/PointWallet";
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
    <div className="flex flex-col gap-1">
      {pointWallets.map((pointWallet) => (
        <PointWalletDisplay
          key={pointWallet.id}
          pointWallet={pointWallet}
          onClick={
            onClick ? (pointWallet) => onClick(pointWallet) : undefined
          }
        />
      ))}
    </div>
  );
};
