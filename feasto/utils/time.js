export function convertTo24Hour(time) {
  if (!time) return "";
  let [hour, minutePart] = time.split(":");
  let [minute, modifier] = minutePart.split(" ");

  hour = parseInt(hour, 10);
  if (modifier?.toLowerCase() === "pm" && hour !== 12) {
    hour += 12;
  }
  if (modifier?.toLowerCase() === "am" && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:${minute.padStart(2, "0")}`;
}
