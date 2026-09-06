import group from "@/assets/about-group.jpeg";
import portrait from "@/assets/about-portrait.jpeg";
import pair from "@/assets/about-pair.jpeg";
import teach from "@/assets/about-teach.jpeg";
import replacePhoto from "@/assets/replace-photo.png";

export function AboutCollage() {
  return (
    <div className="grid auto-rows-[62px] grid-cols-6 gap-3 sm:auto-rows-[76px]">
      <figure className="collage-tile col-span-3 row-span-5 sm:col-span-2">
        <img src={portrait} alt="HATAEC TECH student developer" loading="lazy" width={700} height={1024} />
      </figure>

      <figure className="collage-tile col-span-3 row-span-3 sm:col-span-4">
        <img src={group} alt="HATAEC TECH batch celebrating placements" loading="lazy" width={1024} height={700} />
      </figure>

      <div className="collage-stat col-span-3 row-span-2 sm:col-span-2">
        <p className="font-display text-3xl font-semibold leading-none">1200+</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] opacity-80">Students Taught</p>
      </div>

      <figure className="collage-tile col-span-3 row-span-2 sm:col-span-2">
        <img src={pair} alt="Students pair programming in a lab" loading="lazy" width={900} height={700} />
      </figure>

      <figure className="collage-tile col-span-6 row-span-3 sm:col-span-2">
        <img src={replacePhoto} alt="Team of mentors at HATAEC TECH" loading="lazy" width={1024} height={700} />
      </figure>

      <figure className="collage-tile col-span-6 row-span-3 sm:col-span-4">
        <img
          src={teach}
          alt="Mentor teaching a live session"
          loading="lazy"
          className="h-full w-full object-cover object-[15%_35%]"
        />
      </figure>
    </div>
  );
}
