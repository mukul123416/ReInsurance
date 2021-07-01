import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedlistComponent } from './proposedlist.component';

describe('ProposedlistComponent', () => {
  let component: ProposedlistComponent;
  let fixture: ComponentFixture<ProposedlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
