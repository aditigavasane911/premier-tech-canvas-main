import group from "@/assets/about-group.webp";
import portrait from "@/assets/layout-training.webp";
import pair from "@/assets/about-pair.webp";
import student from "@/assets/student-photo.webp";
import replacePhoto from "@/assets/replace-photo.webp";

export function AboutCollage() {
  return (
    <div className="grid auto-rows-[62px] grid-cols-6 gap-3 sm:auto-rows-[76px]">
      <figure className="collage-tile col-span-3 row-span-5 sm:col-span-2">
        <img
          src={portrait}
          alt="Team Group Photo"
          loading="lazy"
          decoding="async"
          width={800}
          height={800}
          className="h-full w-full object-cover"
        />
      </figure>

      <figure className="collage-tile col-span-3 row-span-3 sm:col-span-4">
        <img
          src={group}
          alt="HATAEC TECH batch celebrating placements"
          loading="lazy"
          decoding="async"
          width={1000}
          height={750}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="collage-stat col-span-3 row-span-2 sm:col-span-2">
        <p className="font-display text-3xl font-semibold leading-none">1200+</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] opacity-80">Students Taught</p>
      </div>

      <figure className="collage-tile col-span-3 row-span-2 sm:col-span-2">
        <img
          src={pair}
          alt="Students pair programming in a lab"
          loading="lazy"
          decoding="async"
          width={900}
          height={506}
          className="h-full w-full object-cover"
        />
      </figure>

      <figure className="collage-tile col-span-6 row-span-3 sm:col-span-2">
        <img
          src={replacePhoto}
          alt="Team of mentors at HATAEC TECH"
          loading="lazy"
          decoding="async"
          width={1000}
          height={750}
          className="h-full w-full object-cover"
        />
      </figure>

      <figure className="collage-tile col-span-6 row-span-3 sm:col-span-4">
        <img
          src={student}
          alt="Students in a lab session"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
          className="h-full w-full object-cover object-[15%_35%]"
        />
      </figure>
    </div>
  );
}
