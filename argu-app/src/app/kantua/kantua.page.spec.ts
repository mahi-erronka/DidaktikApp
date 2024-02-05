import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KantuaPage } from './kantua.page';

describe('KantuaPage', () => {
  let component: KantuaPage;
  let fixture: ComponentFixture<KantuaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KantuaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
