import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SentimenduakPage } from './sentimenduak.page';

describe('SentimenduakPage', () => {
  let component: SentimenduakPage;
  let fixture: ComponentFixture<SentimenduakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SentimenduakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
