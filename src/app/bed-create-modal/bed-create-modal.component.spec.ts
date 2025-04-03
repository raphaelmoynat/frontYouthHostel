import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedCreateModalComponent } from './bed-create-modal.component';

describe('BedCreateModalComponent', () => {
  let component: BedCreateModalComponent;
  let fixture: ComponentFixture<BedCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
