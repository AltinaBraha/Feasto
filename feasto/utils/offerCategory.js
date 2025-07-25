export function getTodaysOfferCategory() {
  const days = ["starters", "pizza", "sides", "pasta", "starters", "pizza", "sides"];
  const today = new Date().getDay(); // 0 = Sunday
  return days[today];
}
