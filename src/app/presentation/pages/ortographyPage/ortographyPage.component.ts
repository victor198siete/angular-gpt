import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { ChatMessageComponent, GptMessageOrtographyComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { Message } from '@interfaces/index';

@Component( {
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrtographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './ortographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export default class OrthographyPageComponent {

  public messages = signal<any[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  handleMessage( prompt: string ) {

    this.isLoading.set(true);
    this.messages.update( (prevMessages) => [
      ...prevMessages,
      {
        isGpt: false,
        text: prompt
      }
    ])

    this.openAiService.checkOrtography( prompt )
      .subscribe((resp)=> {
        this.isLoading.set(false);

        this.messages.update( prevMessages => [
          ...prevMessages,
          {
            isGpt: true,
            text: resp.message,
            info: resp,
          }
        ])
      })
  }
}
