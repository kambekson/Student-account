import { School, SchoolFilter } from "@/entities/School";
import { Pagination } from "@/entities/Common";
import { getClient } from "@/shared/api/base";
import BaseMapper from "@/entities/Common/api/mapper";
import { Paths } from "types/openapi";
import { SchoolsMapper } from "@/entities/School/api/mapper";

export default class SchoolAPI {
  static async fetchSchools(filter: SchoolFilter): Promise<Pagination<School>> {
    const client = await getClient();
    const response = await client.getSchools(filter);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetSchools.Responses.$200,
      SchoolsMapper.toSchool
    );
  }
}
