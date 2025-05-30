import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class TeamtailorApiHandler {
    private apiVersionHeader = '20240904';
    private acceptApiHeader = 'application/vnd.api+json';
    private apiKey = process.env.API_KEY;

    async getData<T>(url: string, method: string): Promise<T> {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Token token=${this.apiKey}`,
                    'Accept': this.acceptApiHeader,
                    'X-Api-Version': this.apiVersionHeader,
                }
            });
            const data = (await response.json() as T);
            return data;
        } catch (e) {
            new Logger().error(`Error when fetch ${url} , Error: ${e.message}`);
            // Some data from API are not valid JSON. I want to keep file creation so i skip that.
            // throw new ApiError(e);
            return {} as T;
        }
    }
}