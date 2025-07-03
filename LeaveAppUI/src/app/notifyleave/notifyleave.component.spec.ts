import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyleaveComponent } from './notifyleave.component';

describe('NotifyleaveComponent', () => {
  let component: NotifyleaveComponent;
  let fixture: ComponentFixture<NotifyleaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyleaveComponent]
    });
    fixture = TestBed.createComponent(NotifyleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
