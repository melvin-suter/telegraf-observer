import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemOutputComponent } from './config-item-output.component';

describe('ConfigItemOutputComponent', () => {
  let component: ConfigItemOutputComponent;
  let fixture: ComponentFixture<ConfigItemOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigItemOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
