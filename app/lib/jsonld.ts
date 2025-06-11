export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pukhtunkhwa Encyclopedia",
  url: "https://pukhtunkhwa.com",
  description: "A comprehensive encyclopedia of Khyber Pakhtunkhwa's culture, history, and heritage.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://pukhtunkhwa.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pukhtunkhwa Encyclopedia",
  url: "https://pukhtunkhwa.com",
  logo: "https://pukhtunkhwa.com/pukhtunkhwa-logo.png",
  sameAs: [
    "https://twitter.com/kpcybers",
    "https://github.com/kpcybers"
  ]
}

export const breadcrumbJsonLd = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item
  }))
})

export const articleJsonLd = (article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  author: {
    "@type": "Person",
    name: article.author
  },
  image: article.image,
  url: article.url
}) 