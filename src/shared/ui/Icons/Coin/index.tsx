import { PointTypeVisual } from "@/entities/Common";

interface CoinIconProps {
  pointType: PointTypeVisual;
  size?: number;
  filter?: string;
  style?: React.CSSProperties;
}

export const CoinIcon: React.FC<CoinIconProps> = ({
  pointType,
  size = 24,
  filter,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    ...style,
  };

  const finalStyle: React.CSSProperties = {
    ...baseStyle,
    ...(filter ? { filter } : {}),
  };

  return typeof pointType.content === "string" ? (
    <img src={pointType.content} alt={pointType.name} style={finalStyle} />
  ) : (
    <pointType.content style={finalStyle} />
  );
};
