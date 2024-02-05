import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HizkiSopaPage } from './hizki-sopa.page';

describe('HizkiSopaPage', () => {
  let component: HizkiSopaPage;
  let fixture: ComponentFixture<HizkiSopaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HizkiSopaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
