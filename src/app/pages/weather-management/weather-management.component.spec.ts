import { ComponentFixture, TestBed } from '@angular/core/testing';
import WeatherManagementComponent from './weather-management.component';

describe('WeatherManagementComponent', () => {
  let component: WeatherManagementComponent;
  let fixture: ComponentFixture<WeatherManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
