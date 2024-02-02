import type { OrtographyResponse } from '../../../interfaces/index';
import { environment } from "environments/environment.development";

export const ortographyUseCase = async ( prompt:string) => {

  try {

    const resp = await fetch(`${environment.backendApi}/ortography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
    });

    if (!resp.ok ) throw new Error('No se pudo realizar la correción!');

    const data = await resp.json() as OrtographyResponse;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      useScore: 0,
      errors: [],
      message: 'No se pudo realizar la Operación!'
    }
  }
}
