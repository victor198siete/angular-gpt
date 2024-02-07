import { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCaseFunction(prompt: string, abortSignal: AbortSignal) {
  console.log('prosConsStreamUseCaseFunction...');
  try {
    const resp = await fetch(`${ environment.backendApi }/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });

    if( !resp.ok ) throw new Error('No se pudo realizar la comparación');

    const reader = resp.body?.getReader();
    if ( !reader ) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder();
    let text = '';

    while( true ) {
      const { value, done } = await reader.read();
      if ( done ) {
        break;
      }

      const decodeChunk = decoder.decode( value, {stream: true });
      text += decodeChunk;
      yield text;
      console.log(text);
    }
    return text;

  } catch (error) {
    return null;
  }
}

export const prosConsStreamUseCase = async (prompt: string) => {
  console.log('prosConsStreamUseCase...');
  try {
    const resp = await fetch(`${ environment.backendApi }/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if( !resp.ok ) throw new Error('No se pudo realizar la comparación');

    const reader = resp.body?.getReader();
    if ( !reader ) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder();
    let text = '';

    while( true ) {
      const { value, done } = await reader.read();
      if ( done ) {
        break;
      }

      const decodeChunk = decoder.decode( value, {stream: true });
      text += decodeChunk;
      console.log(text);
    }

    return null;


  } catch (error) {
    return null;
  }
}
