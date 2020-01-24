import { Injector } from '@angular/core';

export class KiiInjectorService {

  private static injector: Injector;

  static setInjector(injector: Injector) {

    KiiInjectorService.injector = injector;

  }

  static getInjector(): Injector {

    return KiiInjectorService.injector;

  }

} 