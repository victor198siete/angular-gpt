import { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";

export const translateUseCase = async ( prompt:string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
    });

    if (!resp.ok ) throw new Error('No se pudo realizar la Traducción!');

    const data = await resp.json() as TranslateResponse;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la Traducción!'
    }
  }
}
