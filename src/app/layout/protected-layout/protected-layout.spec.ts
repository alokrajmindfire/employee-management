import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtectedLayout } from './protected-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProtectedLayout', () => {
  let component: ProtectedLayout;
  let fixture: ComponentFixture<ProtectedLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProtectedLayout,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
