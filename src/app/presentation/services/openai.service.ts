import { Injectable } from '@angular/core';

import { from } from 'rxjs';

import { ortographyUseCase } from '@use-cases/index';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  constructor() { }

  checkOrtography(prompt: string){
    return from(ortographyUseCase(prompt));
  }

}
