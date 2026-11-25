export const ABOUT_TABS = ['experience', 'education', 'skills', 'certificates'] as const;
export type AboutTab = (typeof ABOUT_TABS)[number];
