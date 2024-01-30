import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent, FileMessageEvent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TypingLoaderComponent } from "@components/index";

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
    ],
    templateUrl: './ortographyPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {

  handleMessage( prompt: string ){
    console.log({prompt});
  }

  handleMessageWithFile({ prompt, file }: FileMessageEvent){
    console.log({ prompt, file});
  }
}
