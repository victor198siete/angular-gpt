import { Injectable } from '@angular/core';

import { from } from 'rxjs';

import { ortographyUseCase, prosConsStreamUseCase, prosConsStreamUseCaseFunction } from '@use-cases/index';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  constructor() { }

  checkOrtography(prompt: string){
    return from(ortographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string){
    return from(prosConsUseCase(prompt));
  }

  prosConsDiscusserStream(prompt: string){
    return prosConsStreamUseCase(prompt);
  }

  prosConsDiscusserStreamFunction(prompt: string, abortSignal: AbortSignal){
    return prosConsStreamUseCaseFunction(prompt, abortSignal);
  }

}
