import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemInputComponent } from './config-item-input.component';

describe('ConfigItemInputComponent', () => {
  let component: ConfigItemInputComponent;
  let fixture: ComponentFixture<ConfigItemInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigItemInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
