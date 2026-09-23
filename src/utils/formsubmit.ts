/**
 * FormSubmit puede responder HTTP 200 e indicar el fallo en el cuerpo
 * (p. ej. {"success":"false"} si el formulario aún no está activado), así que
 * no basta con response.ok para saber si el mensaje se ha aceptado.
 */
export async function isSubmissionAccepted(response: Response): Promise<boolean> {
  if (!response.ok) return false;
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "success" in data) {
      const success = (data as { success: unknown }).success;
      return success !== false && success !== "false";
    }
    return true;
  } catch {
    // Respuesta 2xx sin JSON válido: se considera aceptada.
    return true;
  }
}

/** Valida un teléfono español/internacional: solo dígitos y separadores habituales, 9-15 dígitos. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^[+\d\s().\-/]+$/.test(value) && digits.length >= 9 && digits.length <= 15;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
