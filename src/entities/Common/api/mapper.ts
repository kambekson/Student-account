import { File as ApiFile, Components } from "types/openapi";
import { isValid } from "date-fns";
import { Pagination } from "@/entities/Common";
import { Language, ServiceFile } from "@/entities/Common";

export default class BaseMapper {
  static paginationFromApi<T, V>(
    page: { items: T[]; metadata: Components.Schemas.PaginationMetadata },
    f: (t: T) => V
  ): Pagination<V> {
    return {
      items: page.items.map(f),
      metadata: { ...page.metadata },
    };
  }

  static toDate(dateString?: string): Date | undefined {
    if (!dateString) return undefined;

    const parsedDate = new Date(dateString);
    return isValid(parsedDate) ? parsedDate : undefined;
  }

  static toServiceFile(file: ApiFile): ServiceFile {
    return {
      name: file.name,
      size: file.size,
      url: file.url,
    };
  }

  static toLanguage(apiLanguage: Components.Schemas.Language): Language {
    const typeMap: Record<Components.Schemas.Language, Language> = {
      ru: Language.RU,
      kk: Language.KZ,
    };

    const mappedType = typeMap[apiLanguage];
    if (!mappedType) {
      throw new Error(`Unknown language: ${apiLanguage}`);
    }
    return mappedType;
  }
}
