import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageBoxEvent } from "@components/index";
import { Message } from "@interfaces/messages.interface";
import { OpenAiService } from "app/presentation/services/openai.service";
import { TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';

@Component({
    selector: 'app-translate-page',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ChatMessageComponent,
      MyMessageComponent,
      TypingLoaderComponent,
      TextMessageBoxComponent,
      TextMessageBoxSelectComponent
    ],
    templateUrl: './translatePage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  public messages = signal<any[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
    { id: 'bulgaro', text: 'Bulgaro' },

  ]);

  handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxEvent ) {

    const message = `Traduce a ${ selectedOption }: ${ prompt }`;

    this.isLoading.set(true);
    this.messages.update( prev => [ ...prev, { text: message, isGpt: false }]);

    this.openAiService.translate( prompt, selectedOption )
      .subscribe( ({ message }) => {

        this.isLoading.set(false);
        this.messages.update( prev => [...prev, { text: message, isGpt: true }] );

      })


  }
}
