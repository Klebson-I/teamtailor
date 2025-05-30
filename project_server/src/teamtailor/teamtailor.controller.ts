import { Controller, Get } from '@nestjs/common';
import { TeamtailorService } from './teamtailor.service';

@Controller('/teamtailor')
export class TeamtailorController {
    constructor(
        private teamtailorService: TeamtailorService
    ){}
    
    @Get('/employee')
    async getEmployee() {
        return this.teamtailorService.getEmployee();
    }
}
