import { Injectable } from '@angular/core';

import { from } from 'rxjs';

import { ortographyUseCase,prosConsUseCase, prosConsStreamUseCase, prosConsStreamUseCaseFunction, translateUseCase, travelUseCase } from '@use-cases/index';

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

  travel(prompt: string){
    return travelUseCase(prompt);
  }

  translate(prompt: string){
    return translateUseCase(prompt);
  }


}
