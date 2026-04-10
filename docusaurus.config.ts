import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Puerix Docs",
  tagline: "Guia de integracao API, SDK e Web",
  favicon: "img/favicon.ico",

  url: "https://docs.puerix.com",
  baseUrl: "/",

  organizationName: "Puerix",
  projectName: "puerix-docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false,
        pages: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Puerix",
      logo: {
        alt: "Logo Puerix",
        src: "img/puerix-logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "integrationSidebar",
          position: "left",
          label: "Integracao",
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
