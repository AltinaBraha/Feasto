export function isOfferTimeActive() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 10 && hour < 13;
}
