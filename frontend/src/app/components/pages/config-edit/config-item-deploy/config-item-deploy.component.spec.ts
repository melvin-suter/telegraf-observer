import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemDeployComponent } from './config-item-deploy.component';

describe('ConfigItemDeployComponent', () => {
  let component: ConfigItemDeployComponent;
  let fixture: ComponentFixture<ConfigItemDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigItemDeployComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
