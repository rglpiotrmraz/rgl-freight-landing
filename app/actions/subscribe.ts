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

  // Debug: log env availability (values hidden for security)
  console.log("LISTMONK_API_URL present:", !!LISTMONK_API_URL);
  console.log("LISTMONK_LIST_UUID present:", !!LISTMONK_LIST_UUID);

  if (!LISTMONK_API_URL || !LISTMONK_LIST_UUID) {
    console.error("Missing environment variables for Listmonk integration");
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  try {
    const response = await fetch(
      `${LISTMONK_API_URL}/api/public/subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
        body: JSON.stringify({
          email,
          name: `${nazwaFirmy} | ${nazwisko}`,
          list_uuids: [LISTMONK_LIST_UUID],
          status: "unconfirmed",
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

    const responseData = await response.json().catch(() => ({}));
    const hasOptin = responseData?.data?.has_optin === true;

    return {
      success: true,
      message: hasOptin
        ? "Check your inbox and confirm your email to complete the subscription."
        : "Thank you for joining!",
    };
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return {
      success: false,
      message: "Server unreachable. Please try again later.",
    };
  }
}
