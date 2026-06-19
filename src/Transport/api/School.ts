import { School, SchoolFilter } from "@/Common/Entity/Base/School";
import { Pagination } from "@/Common/Entity/Pagination";
import { getClient } from "..";
import BaseMapper from "../mappers";
import { Paths } from "types/openapi";
import { SchoolsMapper } from "../mappers/school";

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
