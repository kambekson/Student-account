import subcodeMap from "../../../assets/info/subcodeTranslations.json";
import { MiniClient } from "./clients";
import { UUID } from "@/entities/Common";

export { subcodeMap};

export class InformationSystemError extends Error {
    constructor(
      public code: number,
      public message: string,
      public details?:
        | (WorkingWithClientsError | StudentAttendanceError)[]
        | ResourceAccessingError
        | object,
      public subcode?: keyof typeof subcodeMap
    ) { super(message); }
  }
  
  export interface WorkingWithClientsError {
    acceptable: string | string[];
    clients: MiniClient[];
    error: string;
    fieldId: UUID;
    value: string;
  }
  
  export interface StudentAttendanceError {
    absenceReasonId?: UUID;
    error: string;
    groupId?: UUID;
    notUniqueStudentIds?: UUID;
    studentId: UUID;
  }
  
  export interface ResourceAccessingError {
    method: Method;
    resource: Resource;
  }
  
  enum Method {
    get = "get",
    getList = "getList",
    create = "create",
    update = "update",
    delete = "delete",
  }
  
  enum Resource {
    schools = "schools",
  }
