import { Components } from "types/openapi";
import BaseMapper from ".";
import { PointType, PointWallet } from "@/Common/Entity/Base/Point";

export class PointMapper {
    static toPointType(apiResponse: Components.Schemas.PointType): PointType {
      return {
        id: apiResponse.id,
        name: apiResponse.name,
        schoolId: apiResponse.schoolId,
        pointFile:
          apiResponse.pointFile &&
          BaseMapper.toServiceFile(apiResponse.pointFile),
      };
    }

    static toPointWallet(apiResponse: Components.Schemas.PointWallet): PointWallet {
        return {
            id: apiResponse.id,
            points: apiResponse.points,
            pointType: apiResponse.pointType && PointMapper.toPointType(apiResponse.pointType),
        };
    }
  }