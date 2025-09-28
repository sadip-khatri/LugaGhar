export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    slug: "how-to-build-a-versatile-wardrobe-in-2025",
    title: "How to Build a Versatile Wardrobe in 2025",
    excerpt: "Master the art of dressing smart with timeless pieces that mix and match for any occasion.",
    content: `Creating a versatile wardrobe means investing in essentials that never go out of style. From crisp white shirts to tailored trousers and neutral-toned outerwear, discover how to build a wardrobe that works year-round.\n\nWe break down the key pieces you need and how to style them effortlessly.`,
    image: "/blog01.jpg",
    author: "LugaGhar Style Team",
    date: "2025-06-28",
  },
  {
    id: 2,
    slug: "top-10-must-have-summer-outfits-for-men-and-women",
    title: "Top 10 Must-Have Summer Outfits for Men & Women",
    excerpt: "Beat the heat in style with these handpicked summer fashion essentials.",
    content: `Summer 2025 is all about comfort and minimalism. Discover breezy cotton kurtas, flowy dresses, linen shirts, and matching sets that are perfect for both urban wear and casual outings.\n\nGet styling tips for everyday looks and where to wear them.`,
    image: "/blog02.jpg",
    author: "LugaGhar Fashion Desk",
    date: "2025-06-22",
  },
  {
    id: 3,
    slug: "accessorize-right-how-to-enhance-your-look",
    title: "Accessorize Right: How to Enhance Your Look",
    excerpt: "The perfect accessory can elevate your outfit from good to great—here’s how to get it right.",
    content: `Whether it’s a statement necklace, a woven belt, or a sleek handbag, accessories complete your look. Learn how to pair the right accessories with your outfits and how to avoid overdoing it.\n\nPlus, explore trending pieces in 2025 from local artisans.`,
    image: "/blog03.jpg",
    author: "Fashion Tips by LugaGhar",
    date: "2025-06-15",
  },
  {
    id: 4,
    slug: "sustainable-fashion-why-it-matters-now-more-than-ever",
    title: "Sustainable Fashion: Why It Matters Now More Than Ever",
    excerpt: "Fast fashion is fading. Learn how conscious clothing choices impact the planet.",
    content: `Switching to sustainable fabrics like organic cotton, hemp, and bamboo is more than a trend—it’s a responsibility. Discover brands, tips, and practices that support a greener wardrobe without sacrificing style.`,
    image: "/blog04.jpg",
    author: "Eco Fashion Nepal",
    date: "2025-06-01",
  },
  {
    id: 5,
    slug: "how-to-care-for-your-clothes-so-they-last-longer",
    title: "How to Care for Your Clothes So They Last Longer",
    excerpt: "Washing, storing, and handling tips to make your clothes look new for years.",
    content: `Learn how to read clothing labels, sort by fabric, and use gentle detergents. We also cover how to properly fold and store your garments, and when to avoid tumble drying.\n\nProper care can significantly extend the life of your wardrobe staples.`,
    image: "/blog05.jpg",
    author: "LugaGhar Care Team",
    date: "2025-05-20",
  },
  {
    id: 6,
    slug: "what’s-trending-in-nepali-fashion-2025",
    title: "What’s Trending in Nepali Fashion – 2025",
    excerpt: "Explore the hottest trends in the local fashion scene this year.",
    content: `From fusion ethnic wear to bold monochrome fits, fashion in Nepal is evolving rapidly. We highlight the key styles dominating the market—from streetwear to wedding fashion—and how to incorporate them into your personal style.`,
    image: "/blog06.jpg",
    author: "LugaGhar Trend Watch",
    date: "2025-05-05",
  },
];
