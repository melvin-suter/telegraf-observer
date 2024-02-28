import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemInputsComponent } from './config-item-inputs.component';

describe('ConfigItemInputsComponent', () => {
  let component: ConfigItemInputsComponent;
  let fixture: ComponentFixture<ConfigItemInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigItemInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
