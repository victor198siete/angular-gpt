import type { TravelResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";

export const travelUseCase = async ( prompt:string) => {

  try {

    const resp = await fetch(`${environment.backendApi}/travel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
    });

    if (!resp.ok ) throw new Error('No se pudo generar Respuesta!');

    const data = await resp.json() as TravelResponse;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: 'No se pudo generar Respuesta!'
    }
  }
}
