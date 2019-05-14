import {Injectable, ErrorHandler, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionStorageService} from 'angular-web-storage';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private router: Router;
  constructor(private injector: Injector, private ngZone: NgZone, public session: SessionStorageService) {
  }

  handleError(error: any) {
    let router = this.injector.get(Router);
    this.router = router;

    if (error instanceof HttpErrorResponse) {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      this.session.set('er', error.error.error.message);
      this.session.set('code', error.status);
    } else {
      // A client-side or network error occurred.
      this.session.set('er', 'An error occurred');
    }
    this.navigate(['/error']);
  }

  private navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }
}
