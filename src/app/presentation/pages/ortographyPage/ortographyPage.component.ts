import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, FileMessageEvent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from "@components/index";
import { Message } from "@interfaces/index";
import { OpenAiService } from "app/presentation/services/openai.service";

@Component({
    selector: 'app-ortography-page',
    standalone: true,
    imports: [
        CommonModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        TextMessageBoxFileComponent,
        TextMessageBoxSelectComponent
    ],
    templateUrl: './ortographyPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  // public openAiServ = inject( OpenAiService );

  constructor(
    public openAiSer: OpenAiService
  ){}

  handleMessage( prompt: string ){
    console.log({prompt});
  }

  handleMessageWithFile({ prompt, file }: FileMessageEvent){
    console.log({ prompt, file});
  }

  handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
    console.log({prompt, selectedOption});
  }
}
