"use client";
import emailjs from "@emailjs/browser";

export const sendRejectionEmail = async (reservation) => {
  const templateParams = {
    to_name: reservation.name,
    to_email: reservation.email,
    people: reservation.people,
    date_time: reservation.dateTime,
  };

  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_REJECT_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
    console.log("Rejection email sent:", result.status);
  } catch (error) {
    console.error("Failed to send rejection email:", error);
  }
};
