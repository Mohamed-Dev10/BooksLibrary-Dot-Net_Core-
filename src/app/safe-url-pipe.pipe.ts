import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrlPipe'
})
export class SafeUrlPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}


  transform(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
