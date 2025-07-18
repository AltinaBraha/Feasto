import chefs from "@/app/data/chefs.json";

export default function OtherChefs() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid md:grid-cols-3 gap-12">
        {chefs.others.map((chef) => (
          <div key={chef.name}>
            <img
              src={chef.image}
              alt={chef.name}
              className="w-full h-[400px] object-cover mb-4"
            />
            <p className="text-orange-600 font-semibold uppercase text-sm mb-1">
              {chef.role}
            </p>
            <h3 className="text-xl font-bold mb-2">{chef.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{chef.bio}</p>
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
