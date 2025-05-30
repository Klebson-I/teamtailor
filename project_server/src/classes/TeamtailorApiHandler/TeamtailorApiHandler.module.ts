import { Module } from "@nestjs/common";
import { TeamtailorApiHander } from "./TeamtailorApiHandler.service";

@Module({   
    providers: [TeamtailorApiHander],
    exports: [TeamtailorApiHander]
})
export class TeamtailorApiHandlerModule {}