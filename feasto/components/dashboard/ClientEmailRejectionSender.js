"use client";
import emailjs from "@emailjs/browser";


  @param {Object} data 
 
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
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
      process.env.NEXT_PUBLIC_EMAILJS_REJECT_TEMPLATE_ID, 
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY 
    );

    console.log("Rejection email sent:", result.status);
    return result;
  } catch (error) {
    console.error("Failed to send rejection email:", error);
    throw error;
  }
};
