import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from "ngx-markdown";

@Component({
    selector: 'app-chat-message',
    standalone: true,
    imports: [
        CommonModule,
        MarkdownComponent
    ],
    templateUrl: './chat-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {

  @Input({ required:true }) text!: string;
}
