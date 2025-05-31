export type CandidateRaw = {
  data: [
      {
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
    }
  ],
  links: {
    next?: string;
  }
};

export type Candidate = {
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
}

export type ApplicationRaw = {
  data: [
    {
        id: string;
        attributes: {
        'created-at': string;
        }
    }
  ]
  links: {
    next?: string;
  }
}

export type Application = {
        id: string;
        attributes: {
        'created-at': string;
        }
}

export type ApplicationSimplified = {
  id: string;
  createdAt: string;
}