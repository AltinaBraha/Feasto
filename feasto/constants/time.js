export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const startHour = 10; // ora e fillimit (10 am)
  const hour = startHour + Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour < 12 ? "am" : "pm";
  const formattedHour = (((hour + 11) % 12) + 1).toString(); // konverton në 12-orëshe
  return `${formattedHour}:${minute} ${period}`;
});
