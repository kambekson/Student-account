import { School } from "@/entities/School";
import { Components } from "types/openapi";

export class SchoolsMapper {
  static toSchool(apiSchool: Components.Schemas.School): School {
    return {
      ...apiSchool,
    };
  }
}
