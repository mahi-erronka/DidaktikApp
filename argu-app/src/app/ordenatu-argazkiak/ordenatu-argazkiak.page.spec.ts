import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenatuArgazkiakPage } from './ordenatu-argazkiak.page';

describe('OrdenatuArgazkiakPage', () => {
  let component: OrdenatuArgazkiakPage;
  let fixture: ComponentFixture<OrdenatuArgazkiakPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenatuArgazkiakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
