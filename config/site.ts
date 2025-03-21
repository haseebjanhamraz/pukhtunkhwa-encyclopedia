export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Pukhtunkhwa.com",
  description:
    "Pukhtunkhwa.com is a website for the Pukhtunkhwa region of Pakistan.",
  logo: "/pukhtunkhwa.png",
    mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Map",
      href: "/map",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    twitter: "https://twitter.com/kpcybers",
    github: "https://github.com/kpcybers",
    docs: "https://kpcybers.com",
  },
}
