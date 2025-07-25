"use client";
import emailjs from "@emailjs/browser";

/**
 * Dërgon email konfirmimi për rezervim.
 * @param {Object} data - Informacionet e rezervimit
 */
export const sendConfirmationEmail = async (data) => {
  const templateParams = {
    to_email: data.to_email,
    to_name: data.to_name || "Customer",
    people: data.people || 1,
    date: data.date || "N/A",
    time: data.time || "N/A",
    table: data.table || "N/A",
  };

  try {
    console.log(
      "EMAILJS TEMPLATE ID:",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    ); // Debug log
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Feasto
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // template_frwbc1b
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // g3w7nRHgJASZcaos0
    );

    console.log("Confirmation email sent:", result.status);
    return result;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    throw error;
  }
};
