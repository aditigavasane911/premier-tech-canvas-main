const TECH = [
  { name: "React", icon: "react/react-original.svg" },
  { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
  { name: "Express", icon: "express/express-original.svg" },
  { name: "Java", icon: "java/java-original.svg" },
  { name: "Spring", icon: "spring/spring-original.svg" },
  { name: "Python", icon: "python/python-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "typescript/typescript-original.svg" },
  { name: "MySQL", icon: "mysql/mysql-original.svg" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", icon: "docker/docker-original.svg" },
  { name: "HTML5", icon: "html5/html5-original.svg" },
  { name: "CSS3", icon: "css3/css3-original.svg" },
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original.svg" },
  { name: "PHP", icon: "php/php-original.svg" },
];

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...TECH, ...TECH];
  return (
    <div className="marquee-track" data-reverse={reverse ? "true" : undefined}>
      {items.map((t, i) => (
        <div key={`${t.name}-${i}`} className="tech-chip">
          <img
            src={`${BASE}${t.icon}`}
            alt={`${t.name} logo`}
            loading="lazy"
            className="h-9 w-9 object-contain"
          />
          <span className="text-sm font-medium text-foreground/80">{t.name}</span>
        </div>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="marquee-mask space-y-5">
      <Row />
      <Row reverse />
    </div>
  );
}
