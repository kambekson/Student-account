import { UUID } from "./Common";

export class MiniClient {
    constructor(
        public id: UUID,
        public firstName: string,
        public lastName: string,
        public schoolId: UUID,
        public userId?: UUID
    ) { }
}
