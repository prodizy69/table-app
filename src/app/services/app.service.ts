import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApplicationService {

    constructor(private readonly httpClient: HttpClient) {

    }

    fetchData() {
        return this.httpClient.get('./config/sample_data.json');
    }

    updateRowStatus(id, status) {
        return Observable.of({ status: true });
    }
}
