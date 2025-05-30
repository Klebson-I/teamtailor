import { Injectable } from "@nestjs/common";

@Injectable()
export class TeamtailorApiHandler {
    private apiVersionHeader = '20240904';
    private acceptApiHeader = 'application/vnd.api+json';
    private apiKey = '237da83e-8521-42d9-bcfe-35338690e103';

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
            const data = (await response.json() as { data: T });
            return data.data;
        } catch (e) {
            throw new Error(e)
        }
    }
}