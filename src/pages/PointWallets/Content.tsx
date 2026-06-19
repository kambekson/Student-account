import { FC } from "react";
import { PointWallet } from "@/entities/PointWallet";
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
        <div className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {t("Прокрутите вниз для загрузки")}
            </p>
          )}
        </div>
      )}
    </>
  );
};
