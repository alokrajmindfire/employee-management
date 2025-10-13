import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavLinks } from './nav-links';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavLinks', () => {
  let component: NavLinks;
  let fixture: ComponentFixture<NavLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinks, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
