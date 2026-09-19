export const TRUSTED_MEDICAL_SOURCES = [
  {
    name: "WebMD",
    url: "webmd.com",
    description: "Medical news, symptoms, and drug information."
  },
  {
    name: "Mayo Clinic",
    url: "mayoclinic.org",
    description: "Expert, whole-person care and health information."
  },
  {
    name: "Cleveland Clinic",
    url: "my.clevelandclinic.org",
    description: "Clinical and hospital care, research and education."
  },
  {
    name: "Drugs.com",
    url: "drugs.com",
    description: "Prescription drug information, interactions & side effects."
  },
  {
    name: "Vidal Group",
    url: "vidal.fr",
    description: "European health informatics and drug database."
  }
];

export const getTrustedSourcesPromptString = () => {
  return TRUSTED_MEDICAL_SOURCES.map(source => `- ${source.name} (${source.url})`).join("\n");
};
