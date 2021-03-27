import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserdashboardComponent } from './adminuserdashboard.component';

describe('AdminuserdashboardComponent', () => {
  let component: AdminuserdashboardComponent;
  let fixture: ComponentFixture<AdminuserdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuserdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
