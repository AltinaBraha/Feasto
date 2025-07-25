import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OtherChefs({ chefs }) {
  const t = useTranslations();

  if (!chefs || chefs.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid md:grid-cols-3 gap-12">
        {chefs.map((chef) => (
          <div key={chef.name}>
            <Image
              src={chef.image}
              alt={chef.name}
              width={500}
              height={400}
              className="w-full h-[400px] object-cover mb-4"
            />
            <p className="text-orange-600 font-semibold uppercase text-sm mb-1">
              {t(`others.${chef.name}.role`, {}, { fallback: chef.role })}
            </p>
            <h3 className="text-xl font-bold mb-2">{chef.name}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {t(`others.${chef.name}.bio`, {}, { fallback: chef.bio })}
            </p>
            <div className="flex gap-3 text-gray-700 text-xl">
              {chef.socials.map((icon, i) => (
                <a key={i} href={icon.url} target="_blank" rel="noreferrer">
                  <i className={`fab fa-${icon.platform}`}></i>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
