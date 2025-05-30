import { Module } from "@nestjs/common";
import { TeamtailorApiHandler } from "./TeamtailorApiHandler.service";

@Module({   
    providers: [TeamtailorApiHandler],
    exports: [TeamtailorApiHandler]
})
export class TeamtailorApiHandlerModule {}