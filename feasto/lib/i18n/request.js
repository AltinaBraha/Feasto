import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const namespaces = [
    "header",
    "footer",
    "home-page",
    "slider",
    "gallery-feature",
    "reservation-form",
    "reservation-modal",
    "cart",
    "categories",
    "drink-header",
    "drinks",
    "food-details",
    "items",
    "menu-header",
    "menu-tabs-drinks",
    "menu-tabs",
    "sort",
    "subcategories",
    "about-us",
    "chefs",
    "order-modal",
    "auth",
    "menu-tabs-desserts",
    "dessert-header",
    "desserts",
    "events",
  ];

  const messages = {};

  await Promise.all(
    namespaces.map(async (ns) => {
      try {
        const nsMessages = (await import(`../../messages/${locale}/${ns}.json`))
          .default;
        Object.assign(messages, nsMessages);
        //         console.log(`Loading messages for locale: ${locale}`);
        // console.log("Available keys in menu-header:", Object.keys(nsMessages));
      } catch (e) {
        console.warn(`Could not load ${ns} namespace for ${locale}`, e);
      }
    })
  );
  return {
    locale,
    messages,
  };
});
