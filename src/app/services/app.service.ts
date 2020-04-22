import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApplicationService {

    constructor(private readonly httpClient: HttpClient) {

    }

    fetchData() {
        return this.httpClient.get('./config/sample_data.json');
    }

    updateRowStatus(id, status) {
        return this.httpClient.post('./config/sample_data.json', { id: id, status: status });
    }
}
