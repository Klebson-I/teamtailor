import { Injectable } from '@nestjs/common';
import { TeamtailorApiHander } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.service';
import { Parser } from 'json2csv';

export type CandidateRaw = {
  id: string;
  attributes: {
    "first-name": string;
    "last-name": string;
    email: string;
  };
  relationships: {
    "job-applications": {
      data: { id: string }[];
    };
  };
};

export type ApplicationRaw = {
  attributes: {
    'created-at': string;
  }
}

@Injectable()
export class TeamtailorService {
  constructor(
    private apiHandler: TeamtailorApiHander,
  ) {}

  async getEmployeeData() {
    const candidatesResponse = await this.apiHandler.getData<CandidateRaw[]>('https://api.teamtailor.com/v1/candidates?include=job-applications', 'GET');

    const candidatesData = (candidatesResponse as CandidateRaw[]).map(candidate => {
      const jobApplicationIds = candidate.relationships["job-applications"]?.data.map(app => app.id) || [];
      console.log(jobApplicationIds)
      return {
        candidate_id: candidate.id,
        first_name: candidate.attributes["first-name"],
        last_name: candidate.attributes["last-name"],
        email: candidate.attributes.email,
        job_application_id: jobApplicationIds[0],
      };
    });

    return candidatesData;
  }

  async getApplicationData(id: string) {
    const applicationData = await this.apiHandler.getData<ApplicationRaw>(`https://api.teamtailor.com/v1/job-applications/${id}`, 'GET');
    return applicationData.attributes["created-at"];
  }

  async getEmployee() {
    const employeeData = await this.getEmployeeData();

    const candidatesWithCreatedAt = await Promise.all(
      employeeData.map(async candidate => {
        const createdAt = await this.getApplicationData(candidate.job_application_id);
        return {
          ...candidate,
          job_application_created_at: createdAt,
        };
      })
    );

    const fields = Object.keys(candidatesWithCreatedAt[0] ?? {});
    const parser = new Parser({ fields });
    return parser.parse(candidatesWithCreatedAt);
  }
}
