
/**
 * Work experience and projects data
 * Ordered chronologically/by preference as specified
 */
export const WORK_EXPERIENCE = {
  reframe: {
    title: "Designing intelligent systems",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    order: 1,
  }, 
  atmos: {
    title: "Equitable indoor environments",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    order: 2,
  },
  olympal: {
    title: "Olympal • shared sporting experiences for AR",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    href: "/olympal",
    order: 3,
  },
  litbox: {
    title: "Litbox • adressing the literacy crisis in australia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    order: 5,
  },
} as const;

/**
 * Get work experience data sorted by order
 */
export function getWorkExperience() {
  return Object.entries(WORK_EXPERIENCE)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, value]) => ({ id: key, ...value }));
}
