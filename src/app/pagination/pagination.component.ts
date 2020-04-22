import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class PaginationConfig {
  itemsPerPage = 0;
  directionalLinks = false;
  numOfPages: number;
}

@Component({
  selector: 'app-pagination',
  template: `
<ul class="pagination" *ngIf="data.length > 0 && config.itemsPerPage < data.length">
  <li (click)="previous(true)" class="first-page" [ngClass]="{'disabled':currentIndex == 0}" *ngIf="config.directionalLinks">
      First
  </li>
  <li (click)="previous()" class="previous-page" [ngClass]="{'disabled':currentIndex == 0}" *ngIf="config.directionalLinks">
      < Previous
  </li>
  <li class="page-shift-left" (click)="shiftLeft()" *ngIf="hasLeftShift()">
      ...
  </li>
  <li class="page-item" [ngClass]="{'active': page == currentPage }"
      *ngFor="let page of pages; let i = index;"
      [class.hidden]="hideButton(i)"
      (click)="pageSelect(page, i)">
      {{page}}
  </li>
  <li class="page-shift-right" (click)="shiftRight()"  *ngIf="hasRightShift()">
      ...
  </li>
  <li (click)="next()" class="next-page" [ngClass]="{'disabled':currentIndex == (pages.length - 1) }"  *ngIf="config.directionalLinks">
      Next >
  </li>
  <li (click)="next(true)" class="last-page" [ngClass]="{'disabled':currentIndex == (pages.length - 1) }"  *ngIf="config.directionalLinks">
      Last
  </li>
</ul>
`,
  styles: [`
.pagination {
  height: 40px;
}
.pagination > li {
  display:inline;
  position: relative;
  float: left;
  padding: 6px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.pagination > li:hover {
  z-index: 2;
  color: #6c9;
}

.pagination > li.disabled{
  cursor: inherit;
  opacity: 0.5;
}

.pagination > li.disabled:hover {
  z-index: 0;
  color: #000;
}

.pagination > li.active {
  z-index: 3;
  color: #6c9;
  cursor: default;
}

`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginationComponent),
      multi: true
    }
  ]
})
export class PaginationComponent implements ControlValueAccessor, OnChanges {

  @Input()
  config: PaginationConfig;
  @Input()
  data: any[];

  @Output()
  select: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  currentPageData: EventEmitter<any[]> = new EventEmitter<any[]>();

  initialConfig: PaginationConfig = this.config;
  initialData: any[];
  pageStartsAt = 0;
  currentIndex = 0;
  pages: number[] = [];
  currentPage = 1;
  changeFn: Function = (_: any) => { };

  ngOnChanges(changes: SimpleChanges) {
    if (this.config) {
      this.arrangeConfig();
    }
  }

  arrangeConfig() {
    const length = (this.data || []).length;
    const noOfPages = Math.ceil(length / this.config.itemsPerPage);
    this.pages = [];
    for (let j = 1; j <= noOfPages; ++j) {
      this.pages.push(j);
    }
    setTimeout(() => {
      this.writeValue(this.currentPage);
    });
  }


  writeValue(value: number) {
    value = value || 0;
    value = isNaN(value) ? 0 : value;
    value = value >= this.pages.length ? 0 : value;
    if (value > 0 && value <= this.pages.length) {
      this.pageSelect(value, value - 1);
    } else {
      this.pageSelect(1, 0);
    }
    this.pageStartsAt = 0;
  }


  registerOnChange(fn: Function) {
    this.changeFn = fn;
  }
  registerOnTouched() { }

  getPages() {
    return this.pages.slice(this.pageStartsAt, this.pageStartsAt + this.config.numOfPages);
  }

  /**
   * @description A Listener for page button click event.
   */
  pageSelect(page: number, index: number) {
    let data;
    this.currentPage = page;
    this.changeFn(page);
    this.select.emit(page);
    this.currentIndex = index;
    data = this.getData(this.data, this.currentPage, this.config.itemsPerPage);
    setTimeout(() => {
      this.currentPageData.emit(data);
    });
  }

  getData(data, page, noOfItemsPerPage): any[] {
    return data.slice((page - 1) * noOfItemsPerPage, page * noOfItemsPerPage);
  }

  /**
   * @description A Listener for next button click event.
   */
  next(lastPage) {
    if (this.currentIndex < (this.pages.length - 1)) {
      if (!lastPage) {
        ++this.currentIndex;
        if (this.currentIndex > (this.pageStartsAt + this.config.numOfPages - 1)) {
          this.pageStartsAt = this.currentIndex;
        }
      } else {
        this.currentIndex = this.pages.length - 1;
        this.pageStartsAt = this.currentIndex - this.config.numOfPages + 1;
      }
      this.pageSelect(this.pages[this.currentIndex], this.currentIndex);
    }
  }

  /**
   * @description A Listener for previous button click event.
   */
  previous(firstPage) {
    if (this.currentIndex > 0) {
      if (!firstPage) {
        --this.currentIndex;
        if (this.currentIndex < this.pageStartsAt) {
          this.pageStartsAt = this.pageStartsAt - this.config.numOfPages;
        }
      } else {
        this.pageStartsAt = 0;
        this.currentIndex = 0;
      }
      this.pageSelect(this.pages[this.currentIndex], this.currentIndex);
    }
  }

  shiftRight() {
    const startIndex = Math.floor(this.currentIndex / this.config.numOfPages) * this.config.numOfPages;
    this.currentIndex = startIndex + this.config.numOfPages;
    this.pageStartsAt = this.currentIndex;
    this.pageSelect(this.pages[this.currentIndex], this.currentIndex);
  }

  shiftLeft() {
    const startIndex = Math.floor(this.currentIndex / this.config.numOfPages) * this.config.numOfPages;
    this.currentIndex = startIndex - this.config.numOfPages;
    this.pageStartsAt = this.currentIndex;
    this.pageSelect(this.pages[this.currentIndex], this.currentIndex);
  }

  hasRightShift() {
    const length = (this.data || []).length;
    return (this.pageStartsAt + this.config.numOfPages) < (length / this.config.itemsPerPage);
  }

  hasLeftShift() {
    return (this.pageStartsAt - this.config.numOfPages) >= 0;
  }

  hideButton(i: number) {
    this.config.numOfPages = this.config.numOfPages || 5;
    return !(i >= this.pageStartsAt && i < (this.pageStartsAt + this.config.numOfPages));
  }

}
