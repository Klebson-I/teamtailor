import { Injectable } from '@nestjs/common';
import { TeamtailorApiHandler } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.service';
import { Parser } from 'json2csv';
import { Application, ApplicationRaw, ApplicationSimplified, Candidate, CandidateRaw } from './types';

@Injectable()
export class TeamtailorService {
  constructor(
    private apiHandler: TeamtailorApiHandler,
  ) {}

async getEmployeeData() {
  const allCandidates: Candidate[] = [];
  let url: string | null = 'https://api.teamtailor.com/v1/candidates?include=job-applications';
  while (url) {
    const response = await this.apiHandler.getData<CandidateRaw>(url, 'GET');
    const {data, links} = response;
    allCandidates.push(...(data || []));
    url = links?.next || null;
  }
  const candidatesData = allCandidates.map(candidate => {
    const jobApplicationIds = candidate.relationships["job-applications"]?.data.map(app => app.id) || [];
    return {
      candidate_id: candidate.id,
      first_name: candidate.attributes["first-name"],
      last_name: candidate.attributes["last-name"],
      email: candidate.attributes.email,
      job_application_id_list: jobApplicationIds,
    };
  });
  return candidatesData;
}

async getAllApplications(): Promise<ApplicationSimplified[]> {
  const allApplications: Application[] = [];
  let url: string | null = 'https://api.teamtailor.com/v1/job-applications';
    while (url) {
      const response = await this.apiHandler.getData<ApplicationRaw>(
        url,
        'GET'
      );
      const { data, links } = response;
      allApplications.push(...(data || []));
      url = links?.next || null;
    }
    return allApplications.map((application) => ({
      id: application.id,
      createdAt: application.attributes['created-at'],
    }));
  }

  findUserApplication(id: string, allApplications: ApplicationSimplified[]): string | null {
    const match = allApplications.find(app => app.id === id);
    return match?.createdAt ?? null;
  }

  async getEmployee() {
    const employeeData = await this.getEmployeeData();
    const applicationData = await this.getAllApplications();
    const flattened = employeeData.reduce((acc, candidate) => {
          const records = candidate.job_application_id_list.map(appId => {
            const createdAt = this.findUserApplication(appId, applicationData);
            return {
              candidate_id: candidate.candidate_id,
              first_name: candidate.first_name,
              last_name: candidate.last_name,
              email: candidate.email,
              job_application_id: appId,
              job_application_created_at: createdAt,
            };
          });
          return acc.concat(records);
        }, [] as Record<string, string | null>[]);
    const fields = Object.keys(flattened[0] ?? {});
    const parser = new Parser({ fields });
    return parser.parse(flattened);
  }
}
