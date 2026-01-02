import { IProject } from "./PortfolioDetails";

import projectImg1 from "../../../../public/projects/project1.png";

export const projectDummyData: IProject = {
  id: "proj_001",
  location: "Gulshan, Dhaka, Bangladesh",
  slug: "auraluxe-modern-residence",
  projectName: "Auraluxe Modern Residence",
  createdAt: "2025-01-12T10:30:00.000Z",
  updatedAt: "2025-02-05T14:45:00.000Z",

  projectType: {
    _id: "ptype_01",
    name: "Residential Interior",
  },

  client: "Private Client",
  architects: ["Studio Form", "Urban Axis Architects"],

  material: {
    _id: "mat_01",
    name: "Imported Marble & Wood Finish",
  },

  description:
    "Auraluxe Modern Residence is a premium residential interior project featuring imported marble, elegant wood finishes, and contemporary spatial planning. The design emphasizes luxury, comfort, and modern aesthetics while maintaining functionality and sustainability.",

  website: "https://auraluxe.com/projects/auraluxe-modern-residence",
  facebookLink: "https://www.facebook.com/auraluxeofficial",
  instagramLink: "https://www.instagram.com/auraluxe.design",
  linkedinLink: "https://www.linkedin.com/company/auraluxe",
  xLink: "https://x.com/auraluxe",

  projectImg: projectImg1?.src,

  relatedProjects: [
    {
      id: "proj_002",
      projectName: "Auraluxe Corporate Office",
      slug: "auraluxe-corporate-office",
      projectImg: "/projects/auraluxe-corporate-office/cover.jpg",
      location: "Banani, Dhaka",
      status: true,
      createdAt: "2024-11-18T09:20:00.000Z",
    },
    {
      id: "proj_003",
      projectName: "Auraluxe Luxury Apartment",
      slug: "auraluxe-luxury-apartment",
      projectImg: "/projects/auraluxe-luxury-apartment/cover.jpg",
      location: "Dhanmondi, Dhaka",
      status: true,
      createdAt: "2024-10-02T12:10:00.000Z",
    },
    {
      id: "proj_004",
      projectName: "Auraluxe Boutique Showroom",
      slug: "auraluxe-boutique-showroom",
      projectImg: "/projects/auraluxe-boutique-showroom/cover.jpg",
      location: "Uttara, Dhaka",
      status: true,
      createdAt: "2024-09-05T15:00:00.000Z",
    },
  ],

  status: true,
};
