import plgieLogo from "@/assets/colleges/plgie.webp";
import mitcrerLogo from "@/assets/colleges/mitcrer.webp";
import sveriLogo from "@/assets/colleges/sveri.webp";
import fabtechLogo from "@/assets/colleges/fabtech.png";
import msbecLogo from "@/assets/colleges/msbec.webp";
import ritLogo from "@/assets/colleges/rit.webp";
import vvpLogo from "@/assets/colleges/vvp.webp";
import hnccLogo from "@/assets/colleges/hncc.webp";
import grwpLogo from "@/assets/colleges/grwp.jpg";
import smsmpitrLogo from "@/assets/colleges/smsmpitr.webp";
import svitLogo from "@/assets/colleges/svit.png";

export type Workshop = (typeof WORKSHOPS)[number];

export const WORKSHOPS = [
  {
    id: "sveri",
    college: "SVERIS COLLEGE OF ENGINEERING",
    location: "Pandharpur",
    tech: "Java Development",
    date: "August 2024",
    image: sveriLogo,
    isLogo: true,
    workshopsCount: 5,
  },
  {
    id: "fabtech",
    college: "FABTECH COLLEGE",
    location: "Sangola",
    tech: "AWS Cloud Services",
    date: "June 2024",
    image: fabtechLogo,
    isLogo: true,
    workshopsCount: 8,
  },
  {
    id: "plgie",
    college: "Puranmal Lahoti Government Institute of Engineering",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: plgieLogo,
    isLogo: true,
    workshopsCount: 4,
  },
  {
    id: "grwp",
    college: "Government Residential Women's Polytechnic",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: grwpLogo,
    isLogo: true,
    workshopsCount: 3,
  },
  {
    id: "msbec",
    college: "M.S. Bidve Engineering College (MSBEC)",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: msbecLogo,
    isLogo: true,
    workshopsCount: 6,
  },
  {
    id: "hncc",
    college: "S.A.P.D.J. Pathashala's Hirachand Nemchand College of Commerce",
    location: "Solapur",
    tech: "Tech Workshop",
    date: "2024",
    image: hnccLogo,
    isLogo: true,
    workshopsCount: 5,
  },
  {
    id: "rit",
    college: "Rajarambapu Institute of Technology (RIT)",
    location: "Sangli",
    tech: "Tech Workshop",
    date: "2024",
    image: ritLogo,
    isLogo: true,
    workshopsCount: 7,
  },
  {
    id: "vvp",
    college: "Dr. Vithalrao Vikhe Patil College Of Engineering",
    location: "Ahmednagar",
    tech: "Tech Workshop",
    date: "2024",
    image: vvpLogo,
    isLogo: true,
    workshopsCount: 4,
  },
  {
    id: "mitcrer",
    college: "MIT College of Railway Engineering & Research",
    location: "Barshi",
    tech: "Tech Workshop",
    date: "2024",
    image: mitcrerLogo,
    isLogo: true,
    workshopsCount: 3,
  },
  {
    id: "smsmpitr",
    college:
      "Sahakar Maharshi Shankarrao Mohite Patil Institute of Technology & Research (SMSMPITR)",
    location: "Akluj",
    tech: "Tech Workshop",
    date: "2024",
    image: smsmpitrLogo,
    isLogo: true,
    workshopsCount: 1,
  },
  {
    id: "svit",
    college: "Swami Vivekanand Institute Of Technology",
    location: "Solapur",
    tech: "Tech Workshop",
    date: "2024",
    image: svitLogo,
    isLogo: true,
    workshopsCount: 1,
  },
];
