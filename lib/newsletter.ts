export type SubscribeOutcome =
  | { ok: true }
  | { ok: false; reason: "provider_rejected" | "network" | "misconfigured" };

export async function subscribeToNewsletter(email: string): Promise<SubscribeOutcome> {
  const apiKey = process.env["CONVERTKIT_API_KEY"];
  const formId = process.env["CONVERTKIT_FORM_ID"];

  if (!apiKey || !formId) {
    return { ok: false, reason: "misconfigured" };
  }

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ api_key: apiKey, email }),
    });

    if (!response.ok) {
      return { ok: false, reason: "provider_rejected" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
