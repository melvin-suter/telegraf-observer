import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemScriptComponent } from './config-item-script.component';

describe('ConfigItemScriptComponent', () => {
  let component: ConfigItemScriptComponent;
  let fixture: ComponentFixture<ConfigItemScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigItemScriptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
