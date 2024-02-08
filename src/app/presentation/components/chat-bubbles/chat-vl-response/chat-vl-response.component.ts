import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-chat-vl-response',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './chat-vl-response.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatVlResponseComponent {
  @Input({required: true}) userScore!: number;
  @Input({required: true}) text!: string;
  @Input() errors: string[] = [];
}
