import { pointTypeToVisual } from "@/entities/Common";
import { CoinIcon } from "@/shared/ui/Icons/Coin";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: isClickable ? "pointer" : "default",
          gap: "10px",
        }}
        onClick={onBalanceClick}
      >
        <InfoOutlinedIcon
          sx={{
            fontSize: "20px",
            color: "var(--color-text-2)",
          }}
        />

        <CoinIcon pointType={coin} size={24} />

        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "19px",
            paddingLeft: "5px",
            color: "var(--color-text)",
          }}
        >
          {`${totalPoints} ${coin.name}`}
        </span>
      </div>

      {showShopButton && (
        <button style={{ marginLeft: "30px" }} className="primary-button">
          <span>{t("Магазин")}</span>
        </button>
      )}
    </div>
  );
};
