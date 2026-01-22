
/**
 * Work experience and projects data
 * Ordered chronologically/by preference as specified
 */
type CategoryType = 'product' | 'frontend' | 'misc';

export const WORK_EXPERIENCE = {
  reframe: {
    title: "Reframe ✦ designing intelligent systems",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    order: 1,
    categories: ['product', 'frontend'] as CategoryType[]
  },
  atmos: {
    title: "Atmos • equitable indoor environments",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    order: 2,
    categories: ['product', 'frontend'] as CategoryType[]
  },
  olympal: {
    title: "Olympal • shared sporting experiences for AR",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    order: 3,
    categories: ['product', 'frontend', 'misc'] as CategoryType[]
  },
  anu: {
    title: "Anu • no nonsense task management", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    order: 4,
    categories: ['product', 'misc'] as CategoryType[]
  },
  litbox: {
    title: "Litbox • adressing the literacy crisis in australia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    order: 5,
    categories: ['product', 'frontend'] as CategoryType[]
  },
  cobot: {
    title: "Cobot • collaborative robot for visually impaired chemistery students",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    order: 6,
    categories: ['product', 'frontend'] as CategoryType[]
  }
} as const;

/**
 * Get work experience data sorted by order
 */
export function getWorkExperience() {
  return Object.entries(WORK_EXPERIENCE)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, value]) => ({ id: key, ...value }));
}
