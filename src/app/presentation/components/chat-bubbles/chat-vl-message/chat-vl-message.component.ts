import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from "ngx-markdown";

@Component({
    selector: 'app-chat-vl-message',
    standalone: true,
    imports: [
        CommonModule,
        MarkdownComponent
    ],
    templateUrl: './chat-vl-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatVlMessageComponent {
  @Input({ required:true }) text!: string;
}
