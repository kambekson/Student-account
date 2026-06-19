import "@/Presentation/Styles/card.scss";
import { CSSProperties } from "react";

interface CardProps {
  index?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({
  index,
  onClick,
  children,
  className,
  style,
}: CardProps) => {
  return (
    <div
      key={index ?? ""}
      className={`card ${className ?? ""}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
