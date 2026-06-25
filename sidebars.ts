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
        {
          type: "category",
          label: "SDK",
          items: [
            "integracao/sdk/index",
            "integracao/sdk/android",
            "integracao/sdk/ios",
          ],
        },
        "integracao/webhook",
      ],
    },
  ],
};

export default sidebars;
