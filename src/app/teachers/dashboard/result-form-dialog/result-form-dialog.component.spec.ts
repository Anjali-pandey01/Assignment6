import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFormDialogComponent } from './result-form-dialog.component';

describe('ResultFormDialogComponent', () => {
  let component: ResultFormDialogComponent;
  let fixture: ComponentFixture<ResultFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
