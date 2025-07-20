export const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour < 12 ? "am" : "pm";
  const formattedHour = (((hour + 11) % 12) + 1).toString();
  return `${formattedHour}:${minute} ${period}`;
});
