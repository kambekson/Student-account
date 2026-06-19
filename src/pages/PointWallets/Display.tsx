import React from "react";
import { PointWallet } from "@/entities/PointWallet";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      className={`flex items-center bg-[var(--color-background)] border border-gray-200 border-l-4 border-l-[var(--color-accent)] text-[var(--color-text)] mb-3 transition-all duration-200 ${
        onClick ? "cursor-pointer hover:shadow-md" : "cursor-default"
      }`}
      onClick={handleClick}
    >
      <CardContent className="flex items-center flex-grow p-4">
        <Avatar className="w-10 h-10 mr-4 bg-[var(--color-inactive)]">
          {pointType?.pointFile?.url && (
            <AvatarImage src={pointType.pointFile.url} alt={pointType?.name} />
          )}
          <AvatarFallback className="text-xs uppercase bg-gray-200">
            {pointType?.name?.slice(0, 2) || "??"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text)]">
            {pointType?.name || t("Неизвестный тип")}
          </h4>
          <p className="text-xs text-[var(--color-text-2)] mt-0.5">
            {t("Баланс")}: {pointWallet.points}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
