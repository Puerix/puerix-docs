import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  integrationSidebar: [
    "intro",
    {
      type: "category",
      label: "Integracao",
      items: [
        "integracao/api",
        "integracao/web",
        "integracao/sdk",
        "integracao/webhook",
      ],
    },
  ],
};

export default sidebars;
