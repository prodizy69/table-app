import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';


describe('ApplicationService', () => {
    let service: ApplicationService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApplicationService]
        });
        service = TestBed.get(ApplicationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be able to retrieve data from the API via GET', () => {
        const data = [
            {
                'name': 'Nell D. Michael',
                'phone': '602-1033',
                'email': 'hendrerit.id.ante@placeratvelit.ca',
                'company': 'Praesent Eu LLP',
                'date_entry': '2017-07-30 23:27:39',
                'org_num': '907369 2973',
                'address_1': 'P.O. Box 916, 8584 Vestibulum St.',
                'city': 'Vitry-sur-Seine',
                'zip': '2353',
                'geo': '60.77971, 7.98874',
                'pan': '4532992507580',
                'pin': '7086',
                'id': 1,
                'status': 'read',
                'fee': '$60.99',
                'guid': '48653E36-987F-48EC-7382-7F009FF34628',
                'date_exit': '2018-11-14 12:37:54',
                'date_first': '2018-05-20 01:07:05',
                'date_recent': '2019-04-06 23:28:25',
                'url': 'https://capco.com/'
            },
            {
                'name': 'Ciara G. Stanley',
                'phone': '1-358-613-2160',
                'email': 'natoque.penatibus@facilisisloremtristique.co.uk',
                'company': 'Nunc Nulla Vulputate LLP',
                'date_entry': '2018-03-25 11:05:22',
                'org_num': '987983 1023',
                'address_1': 'Ap #700-733 Senectus Rd.',
                'city': 'Maule',
                'zip': '21911',
                'geo': '-47.21116, 22.18684',
                'pan': '4024007170167232',
                'pin': '6394',
                'id': 2,
                'status': 'expired',
                'fee': '$92.73',
                'guid': 'D4CC10B0-5F19-EE33-CCA2-95DBD8E7B21F',
                'date_exit': '2018-07-22 19:05:57',
                'date_first': '2018-08-02 03:50:35',
                'date_recent': '2017-08-12 01:56:58',
                'url': 'https://capco.com/'
            }];
        service.fetchData().subscribe((response: any) => {
            expect(response.length).toBe(2);
        });
        const request = httpMock.expectOne(`./config/sample_data.json`);
        expect(request.request.method).toBe('GET');
        request.flush(data);
    });
});

