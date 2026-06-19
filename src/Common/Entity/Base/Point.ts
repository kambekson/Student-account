import { ServiceFile, UUID } from "./Common";

export interface PointType {
  id: UUID;
  name: string;
  pointFile?: ServiceFile;
  schoolId: UUID;
}

export interface PointWallet {
  id: UUID;
  points: number;
  pointType?: PointType;
}
