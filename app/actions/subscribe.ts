"use server";

import { subscriptionSchema, SubscriptionFormData } from "@/app/lib/schemas";

const LISTMONK_API_URL = process.env.LISTMONK_API_URL;
const LISTMONK_LIST_UUID = process.env.LISTMONK_LIST_UUID;

export async function subscribeToNewsletter(
  formData: SubscriptionFormData
): Promise<{ success: boolean; message: string }> {
  // Validate input server-side
  const parseResult = subscriptionSchema.safeParse(formData);
  if (!parseResult.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your inputs.",
    };
  }

  const { email, nazwaFirmy, nazwisko } = parseResult.data;

  try {
    const response = await fetch(
      `${LISTMONK_API_URL}/api/public/subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: `${nazwaFirmy} | ${nazwisko}`,
          list_uuids: [LISTMONK_LIST_UUID],
          status: "enabled",
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "Unknown error");
      console.error("Listmonk API error:", response.status, errorBody);
      return {
        success: false,
        message: "Server unreachable. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Thank you for joining!",
    };
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return {
      success: false,
      message: "Server unreachable. Please try again later.",
    };
  }
}
