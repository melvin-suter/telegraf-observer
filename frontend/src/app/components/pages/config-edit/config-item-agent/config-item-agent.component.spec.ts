import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemAgentComponent } from './config-item-agent.component';

describe('ConfigItemAgentComponent', () => {
  let component: ConfigItemAgentComponent;
  let fixture: ComponentFixture<ConfigItemAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigItemAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigItemAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
