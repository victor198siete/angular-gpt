import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from "@components/index";
import { Message } from "@interfaces/messages.interface";
import { OpenAiService } from "app/presentation/services/openai.service";

@Component({
    selector: 'app-pros-cons-page',
    standalone: true,
    imports: [
      CommonModule,
      ChatMessageComponent,
      MyMessageComponent,
      TypingLoaderComponent,
      TextMessageBoxComponent
    ],
    templateUrl: './prosConsPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
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
    this.openAiService.prosConsDiscusser( prompt )
    .subscribe((resp)=> {
      this.isLoading.set(false);

      this.messages.update( prevMessages => [
        ...prevMessages,
        {
          isGpt: true,
          text: resp.content,
        }
      ])
    })
  }
}
