import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavLinks } from '../nav-links/nav-links';
import { UserMenu } from '../user-menu/user-menu';
import { Theme } from '../theme/theme';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Header,
        HttpClientTestingModule,
        RouterTestingModule,
        NavLinks,
        UserMenu,
        Theme
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
