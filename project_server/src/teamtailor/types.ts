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
