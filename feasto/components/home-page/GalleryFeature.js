import { getTranslations } from "next-intl/server";
import Image from "next/image";


export default async function GalleryFeature() {
  const t = await getTranslations("GalleryFeature");

  return (
    <section className="w-full py-16">
      <div className="flex flex-col lg:flex-row w-full lg:h-[600px] gap-4 lg:gap-0">
        <div className="w-full lg:w-1/3 h-[300px] lg:h-full relative overflow-hidden group rounded shadow-lg">
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/img/1.jpg)",
            }}
          ></div>
          <div className="absolute left-4 bottom-4 text-left text-white space-y-1 lg:space-y-4">
            <p className="text-sm lg:text-xl font-semibold">{t("recommendations")}</p>
            <p className="text-lg lg:text-[40px] whitespace-nowrap">
              {t("newTastingMenus")}
            </p>
            <p className="text-xs lg:text-sm border-b-2 border-orange-500 w-max mt-1 pb-1">
              {t("springSpecials")}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/3 gap-4 lg:gap-0">
          <div className="flex flex-col sm:flex-row w-full h-[300px] lg:h-1/2">
            <div className="w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden relative group">
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/img/2.jpg)",
                }}
              ></div>
            </div>
            <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-black relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2">
                <p className="text-sm lg:text-xl font-semibold">
                  {t("viewFullMenus")}
                </p>
                <p className="text-xs lg:text-sm border-b-2 border-orange-500 w-max mt-2 lg:mt-4 pb-1 cursor-pointer">
                  {t("learnMore")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full h-[300px] lg:h-1/2">
            <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-black relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2">
                <h3 className="text-xs lg:text-orange-500 font-bold uppercase">
                  {t("recipes")}
                </h3>
                <p className="text-sm lg:text-xl font-semibold">
                  {t("ourChefsSecrets")}
                </p>
                <p className="text-xs lg:text-sm border-b-2 border-orange-500 w-max mt-2 lg:mt-4 pb-1 cursor-pointer">
                  {t("learnMore")}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden relative group">
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/img/3.jpg)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 h-[300px] lg:h-full relative overflow-hidden group rounded shadow-lg ">
          <Image
            src="/img/4.jpg"
            alt="Image with overlay"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-4 bottom-4 text-white text-right z-10 space-y-1 lg:space-y-2">
            <p className="text-sm lg:text-xl font-semibold">{t("wineList")}</p>
            <p className="text-lg lg:text-[40px] leading-none">{t("haveADrink")}</p>
            <p className="text-xs lg:text-sm lg:text-lg border-b-2 border-orange-500 w-max mt-1 pb-1 cursor-pointer">
              {t("learnMore")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
