"use client";
import emailjs from "@emailjs/browser";

/**
 * Dërgon email konfirmimi për rezervim.
 * @param {Object} data
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
    );
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    console.log("Confirmation email sent:", result.status);
    return result;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    throw error;
  }
};
