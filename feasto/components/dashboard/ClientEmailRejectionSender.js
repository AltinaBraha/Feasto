"use client";
import emailjs from "@emailjs/browser";

/**
 * Dërgon email refuzimi për rezervim.
 * @param {Object} data - Informacionet e rezervimit
 */
export const sendRejectionEmail = async (data) => {
  const templateParams = {
    to_email: data.to_email,
    to_name: data.to_name || "Customer",
    people: data.people || 1,
    date: data.date || "N/A",
    time: data.time || "N/A",
    table: data.table || "N/A",
  };

  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Feasto
      process.env.NEXT_PUBLIC_EMAILJS_REJECT_TEMPLATE_ID, // template_a2akwnu
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // g3w7nRHgJASZcaos0
    );

    console.log("Rejection email sent:", result.status);
    return result;
  } catch (error) {
    console.error("Failed to send rejection email:", error);
    throw error;
  }
};
