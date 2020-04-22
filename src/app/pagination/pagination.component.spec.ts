import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';


const pageConfig = { numOfPages: 5, itemsPerPage: 5, directionalLinks: true };
const data = [ { name: 'a', index: 1 }, { name: 'b', index: 2 }, { name: 'c', index: 3 },
{ name: 'd', index: 4 }, { name: 'e', index: 5 }, { name: 'f', index: 6 },
{ name: 'g', index: 7 }, { name: 'h', index: 8 }, { name: 'i', index: 9 },
{ name: 'j', index: 10 }, { name: 'k', index: 11 }, { name: 'l', index: 12 }];
describe('--PaginationComponent Suit --', () => {

    let fixture: ComponentFixture<PaginationComponent>;
    let comp: PaginationComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        comp = fixture.componentInstance;
        comp.config = pageConfig; comp.data = data; comp.arrangeConfig();
    });

    it('Should instantiate component', () => {
        fixture.detectChanges();
        expect(comp).toBeDefined();
        expect(comp.currentIndex).toBe(0);
        expect(comp.pages.length).toBe(3);
    });

    it('Should show next page when called next', () => {
        fixture.detectChanges(); comp.next(false);
        expect(comp.currentIndex).toBe(1);
    });

    it('Should show next page when called next', () => {
        fixture.detectChanges(); comp.next(false); expect(comp.currentIndex).toBe(1);
    });

    it('Should not show next page when on the last page', () => {
        fixture.detectChanges(); comp.next(true); expect(comp.currentIndex).toBe(2);
    });

    it('Should show previous page when called previous', () => {
        fixture.detectChanges(); comp.next(false); comp.next(false); comp.previous(false);
        expect(comp.currentIndex).toBe(1);
    });

    it('Should not show previous page when on the first page', () => {
        fixture.detectChanges(); comp.previous(true);
        expect(comp.currentIndex).toBe(0);
    });

    it('Should go to the selected page when calledpageSelect', () => {
        fixture.detectChanges(); comp.pageSelect(2, 1);
        expect(comp.currentIndex).toBe(1);
    });

    it('Should return true if component can shift right', () => {
        fixture.detectChanges(); expect(comp.hasRightShift()).toBe(false);
    });

    it('Should return true if component can shift left', () => {
        fixture.detectChanges(); expect(comp.hasLeftShift()).toBe(false);
    });
});
