import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PepopleListComponent } from './pepople-list.component';

describe('PepopleListComponent', () => {
  let component: PepopleListComponent;
  let fixture: ComponentFixture<PepopleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PepopleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PepopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
