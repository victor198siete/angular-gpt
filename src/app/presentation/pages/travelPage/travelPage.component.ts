import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatVlMessageComponent } from '@components/chat-bubbles/chat-vl-message/chat-vl-message.component';
import { ChatVlResponseComponent } from '@components/chat-bubbles/chat-vl-response/chat-vl-response.component';

import { ChatMessageComponent, GptMessageOrtographyComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
    selector: 'app-travel-page',
    standalone: true,
    imports: [
      CommonModule,
      ChatMessageComponent,
      MyMessageComponent,
      TypingLoaderComponent,
      TextMessageBoxComponent,
      GptMessageOrtographyComponent,
      ChatVlMessageComponent,
      ChatVlResponseComponent,
    ],
    templateUrl: './travelPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelPageComponent {
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
