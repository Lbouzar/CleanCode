import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    // Implement your guard logic here
    return true;
  }
}
