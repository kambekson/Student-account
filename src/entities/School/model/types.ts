import { BaseFilter, UUID } from "@/entities/Common";

export interface School {
  id: UUID;
  name: string;
  description?: string;
  domain: string;
  fileSize: number;
}

export interface SchoolFilter extends BaseFilter {
  directorId?: UUID;
}
