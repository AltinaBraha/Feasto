import Image from "next/image";
import SeeOurTeamButton from "@/components/about-us/SeeOurTeamButton";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AboutContent() {
  const t = await getTranslations("about-us.aboutContent");
  const missionPoints = Object.values(t.raw("mission.points"));

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
            {t("section")}
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">
            {t("title.line1")}
            <br />
            {t("title.line2")}
          </h2>

          <Image
            src="/img/a2.jpg"
            alt="Restaurant team"
            width={440}
            height={260}
            className="shadow-sm"
          />

          <div className="pt-2">
            <SeeOurTeamButton />
          </div>
        </div>

        <div className="space-y-4 max-w-[520px]">
          <p className="text-gray-700 text-sm leading-relaxed text-justify">
            {t("description")}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold bg-black text-white px-3 py-1.5 text-sm w-full block mb-2">
                {t("vision.title")}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {t("vision.text")}
              </p>
            </div>

            <div>
              <h4 className="font-semibold bg-black text-white px-3 py-1.5 text-sm w-full block mb-2">
                {t("mission.title")}
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {missionPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-500">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mt-10 max-w-[520px]">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                10 <span className="text-orange-500">+</span>
              </h3>
              <p className="text-gray-600 text-xs mt-1">{t("stats.years")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                50 <span className="text-orange-500">+</span>
              </h3>
              <p className="text-gray-600 text-xs mt-1">{t("stats.staff")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                1M <span className="text-orange-500">+</span>
              </h3>
              <p className="text-gray-600 text-xs mt-1">{t("stats.guests")}</p>
            </div>
          </div>

          <div className="pt-4">
            <Image
              src="/img/a1.jpg"
              alt="Restaurant dining"
              width={520}
              height={260}
              className="shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
