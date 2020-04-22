import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listsData: any[] = [];
  currentPageItems: any[] = [];
  lists: any[] = [];

  intialPageConfig = {
    numOfPages: 5,
    itemsPerPage: 5,
    directionalLinks: true
  };
  pageConfig = this.intialPageConfig;
  isOpen = false;

  columns = [{
    label: 'Name',
    value: 'name',
    enabled: true

  },
  {
    label: 'Phone',
    value: 'phone',
    enabled: true
  },
  {
    label: 'Email',
    value: 'email',
    enabled: true
  },
  {
    label: 'Company',
    value: 'company',
    enabled: true
  },
  {
    label: 'Entry Date',
    value: 'date_entry',
    enabled: true
  },
  {
    label: 'Org Num',
    value: 'org_num',
    enabled: false
  },
  {
    label: 'Address 1',
    value: 'address_1',
    enabled: false
  }, {
    label: 'City',
    value: 'city',
    enabled: false
  }, {
    label: 'Zip',
    value: 'zip',
    enabled: false
  }, {
    label: 'Geo',
    value: 'geo',
    enabled: false
  }, {
    label: 'Pan',
    value: 'pan',
    enabled: false
  }, {
    label: 'Pin',
    value: 'pin',
    enabled: false
  }, {
    label: 'ID',
    value: 'id',
    enabled: false
  }, {
    label: 'Status',
    value: 'status',
    enabled: false
  }, {
    label: 'Fee',
    value: 'fee',
    enabled: false
  }, {
    label: 'Date Exit',
    value: 'date_exit',
    enabled: false
  }, {
    label: 'Date First',
    value: 'date_first',
    enabled: false
  }, {
    label: 'Date Recent',
    value: 'date_recent',
    enabled: false
  }, {
    label: 'Url',
    value: 'url',
    enabled: false
  }
  ];

  constructor(
    private readonly appService: ApplicationService
  ) {
    this.appService.fetchData().subscribe((res: any) => {
      this.listsData = res;
      this.lists = this.listsData;
    });
  }

  updateToggle($event: Event) {
    if ($event) {
      $event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
  }


  updateColumnsList(column: any) {
    this.columns.forEach(col => {
      if (col.value === column.value) {
        col.enabled = !col.enabled;
      }
    });
  }

  submitRowStatus(id, status) {
    console.log(`id is ::: ${id} and status is ::: ${status}`);
    this.appService.updateRowStatus(id, status).subscribe((data: any) => {
      console.log('data', data);
    });
  }
}
