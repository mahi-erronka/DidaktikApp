import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestGalderakPage } from './test-galderak.page';

describe('TestGalderakPage', () => {
  let component: TestGalderakPage;
  let fixture: ComponentFixture<TestGalderakPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGalderakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
