import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { ChatMessageComponent, FileMessageEvent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from "@components/index";
import { Message } from "@interfaces/messages.interface";
import { OpenAiService } from "app/presentation/services/openai.service";

@Component({
    selector: 'app-chat-template',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        TextMessageBoxFileComponent,
        TextMessageBoxSelectComponent
    ],
    templateUrl: './chatTemplate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
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
