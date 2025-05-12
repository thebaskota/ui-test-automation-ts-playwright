export const DemoQAUrls = {
    BASE: 'https://demoqa.com',
    ELEMENTS: '/elements',
    FORMS: '/forms',
    ALERTS: '/alerts',
    WIDGETS: '/widgets',
    INTERACTIONS: '/interactions'
} as const; // 'as const' makes these read-only

export type DemoQAUrlKey = keyof typeof DemoQAUrls;

// putting it here for ease, but should be kept in a file called constants. 
export type LoadStates = "load" | "domcontentloaded" | "networkidle";