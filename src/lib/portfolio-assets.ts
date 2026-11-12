/** Keep public assets portable between local development and GitHub Pages. */
export const portfolioBasePath = process.env.NODE_ENV === "production" ? "/Portfolio" : "";

export function assetPath(path: string): string {
  if (/^(https?:|data:|mailto:|tel:)/.test(path)) return path;
  return `${portfolioBasePath}/${path.replace(/^\/+/, "")}`;
}

export const portfolioLinks = {
  email: "myasinzuhayr@gmail.com",
  github: "https://github.com/YasinzHyper",
  linkedin: "https://linkedin.com/in/mohammed-yasin-zuhayr-249158157/",
  resume: "https://drive.google.com/drive/folders/10MPwn8bCUmV8gc3X9Bymyd6Wk1SQIlsj?usp=sharing",
} as const;
