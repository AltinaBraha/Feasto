"use client";
import emailjs from "@emailjs/browser";

/**
 * Dërgon email konfirmimi për rezervim.
 * @param {Object} data - Informacionet e rezervimit
 * @param {string} data.to_email - Email i marrësit
 * @param {string} data.to_name - Emri i marrësit
 * @param {number} data.people - Numri i personave
 * @param {string} data.date_time - Data dhe ora e rezervimit
 */
export const sendConfirmationEmail = async ({
  to_email,
  to_name,
  people,
  date_time,
}) => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        to_email,
        to_name,
        people,
        date_time,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    console.log("Email sent:", result.text);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
