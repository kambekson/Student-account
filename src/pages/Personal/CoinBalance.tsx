import { pointTypeToVisual } from "@/entities/Common";
import { CoinIcon } from "@/shared/ui/Icons/Coin";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CoinBalanceProps {
  totalPoints: number;
  showShopButton?: boolean;
  onBalanceClick?: () => void;
}

export const CoinBalance: React.FC<CoinBalanceProps> = ({
  totalPoints = 0,
  showShopButton = true,
  onBalanceClick,
}) => {
  const coin = pointTypeToVisual();
  const isClickable = !!onBalanceClick;

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex items-center gap-2.5 ${isClickable ? "cursor-pointer" : "cursor-default"}`}
        onClick={onBalanceClick}
      >
        <Info className="w-5 h-5 text-[var(--color-text-2)]" />

        <CoinIcon pointType={coin} size={24} />

        <span className="text-base font-medium leading-[19px] pl-1 text-[var(--color-text)]">
          {`${totalPoints} ${coin.name}`}
        </span>
      </div>

      {showShopButton && (
        <button className="primary-button ml-[30px]">
          <span>{t("Магазин")}</span>
        </button>
      )}
    </div>
  );
};
