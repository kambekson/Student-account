import { PointType } from "@/entities/PointWallet";
import coin from "@/shared/assets/icons/coin.svg?react";

export interface PointTypeVisual {
  name: string;
  content: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const pointTypeToVisual = (pointType?: PointType): PointTypeVisual => {
  if (!pointType || !pointType.pointFile) {
    return {
      name: "RBC",
      content: coin,
    };
  }

  return {
    name: pointType.name,
    content: pointType.pointFile.url,
  };
};
