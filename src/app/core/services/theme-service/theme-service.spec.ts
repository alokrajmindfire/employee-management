import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let service: ThemeService;
  let classListSpy: { add: jasmine.Spy; remove: jasmine.Spy };
  const themeKey = 'theme';

  // Declare the mock storage object here so it’s accessible in all tests
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};

    // Spy on localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });

    // Spy on localStorage.setItem
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });

    // Spy on document.documentElement.classList methods
    classListSpy = {
      add: jasmine.createSpy('add'),
      remove: jasmine.createSpy('remove'),
    };

    // Override document.documentElement.classList with spies
    Object.defineProperty(document.documentElement, 'classList', {
      value: classListSpy,
      configurable: true,
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    // Clear the mock storage after each test
    localStorageMock = {};
    classListSpy.add.calls.reset();
    classListSpy.remove.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with stored theme if available', () => {
    localStorageMock[themeKey] = 'dark';

    // recreate service to run constructor logic again
    service = new ThemeService();

    expect(localStorage.getItem).toHaveBeenCalledWith(themeKey);
    expect(classListSpy.add).toHaveBeenCalledWith('dark');
  });

  it('should default to light theme if no stored theme', () => {
    localStorageMock[themeKey] = '';

    service = new ThemeService();

    expect(localStorage.getItem).toHaveBeenCalledWith(themeKey);
    expect(classListSpy.remove).toHaveBeenCalledWith('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith(themeKey, 'light');
  });

  it('getTheme should return the stored theme or light', () => {
    localStorageMock[themeKey] = 'dark';
    expect(service.getTheme()).toBe('dark');

    localStorageMock[themeKey] = '';
    expect(service.getTheme()).toBe('light');
  });

  it('toggleTheme should toggle between dark and light themes', () => {
    spyOn(service, 'getTheme').and.returnValue('dark');
    spyOn(service, 'setTheme');

    service.toggleTheme();
    expect(service.setTheme).toHaveBeenCalledWith('light');

    (service.getTheme as jasmine.Spy).and.returnValue('light');
    service.toggleTheme();
    expect(service.setTheme).toHaveBeenCalledWith('dark');
  });
});
