const math = require("remark-math");
const katex = require("rehype-katex");
module.exports = {
  title: "Renec Docs",
  tagline:
    "Renec is an open source project implementing a new, high-performance, permissionless blockchain.",
  url: "https://docs.renec.foundation",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "remitano", // Usually your GitHub org/user name.
  projectName: "renec", // Usually your repo name.
  onBrokenLinks: "throw",
  stylesheets: [
    {
      href: "/katex/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "es", "ru", "ar"],
    // localesNotBuilding: ["ko", "pt", "vi", "zh", "ja"],
    localeConfigs: {
      en: {
        label: "English",
      },
      ru: {
        label: "Русский",
      },
      es: {
        label: "Español",
      },
      de: {
        label: "Deutsch",
      },
      ar: {
        label: "العربية",
      },
      ko: {
        label: "한국어",
      },
    },
  },
  themeConfig: {
    navbar: {
      "logo": {
        "alt": "Renec Logo",
        "src": "img/logo-horizontal.png",
        "srcDark": "img/logo-horizontal.png"
      },
      items: [
        // {
        //   href: "https://spl.solana.com",
        //   label: "Program Library »",
        //   position: "left",
        // },
        // {
        //   to: "developing/programming-model/overview",
        //   label: "Develop",
        //   position: "left",
        // },
        {
          to: "running-validator",
          label: "Validate",
          position: "left",
        },
        // {
        //   to: "integrations/exchange",
        //   label: "Integrate",
        //   position: "left",
        // },
        // {
        //   to: "cluster/overview",
        //   label: "Learn",
        //   position: "left",
        // },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        // {
        //   href: "https://discordapp.com/invite/pquxPsq",
        //   label: "Chat",
        //   position: "right",
        // },
        // {
        //   href: "https://github.com/solana-labs/solana",
        //   label: "GitHub",
        //   position: "right",
        // },
      ],
    },
    algolia: {
      // This API key is "search-only" and safe to be published
      apiKey: "d58e0d68c875346d52645d68b13f3ac0",
      indexName: "solana",
      contextualSearch: true,
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Introduction",
        //       to: "introduction",
        //     },
        //   ],
        // },
        {
          title: "Community",
          items: [
            {
              label: "Homepage",
              href: "https://remitano.com",
            },
            {
              label: "Facebook",
              href: "https://facebook.com/remitano",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/remitano",
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/company/remitano",
            },
            {
              label: "Instagram",
              href: "https://instagram.com/remitano",
            },
            {
              label: "Youtube",
              href: "https://youtube.com/remitano",
            },
            {
              label: "Telegram",
              href: "https://t.me/RemitanoTinTuc",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/solana-labs/solana",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Solana Foundation`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "src",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
