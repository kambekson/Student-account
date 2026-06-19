import { School } from "@/Common/Entity/Base/School";
import { Components } from "types/openapi";

export class SchoolsMapper {
  static toSchool(apiSchool: Components.Schemas.School): School {
    return {
      ...apiSchool,
    };
  }
}
