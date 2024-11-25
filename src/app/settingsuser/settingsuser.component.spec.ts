import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsuserComponent } from './settingsuser.component';

describe('SettingsuserComponent', () => {
  let component: SettingsuserComponent;
  let fixture: ComponentFixture<SettingsuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
