import { PostCardDTO } from ".";

export const mockPosts: PostCardDTO[] = [
  {
    id: "1",
    title:
      "A Comprehensive Guide to Learning Programming for Beginners and Beyond and More",
    slug: "comprehensive-guide-programming-beginners",
    description:
      "Beginner's guide to coding with key concepts and practical examples. Dive into the world of programming!",
    created: new Date(2023, 9, 1, 8, 0, 0),
    updated: new Date(2023, 9, 3, 15, 30, 0),
    likes: 42,
    user: {
      name: "alice",
    },
    tags: [
      { id: "1", name: "programming" },
      { id: "2", name: "beginner" },
    ],
    comments: 7,
  },
  {
    id: "2",
    title: "Mastering Web Development: The Fundamentals and Beyond",
    slug: "mastering-web-development-fundamentals",
    description:
      "Discover web development essentials and elevate your skills. Unleash your potential!",
    created: new Date(2023, 8, 15, 11, 20, 0),
    updated: new Date(2023, 8, 18, 14, 45, 0),
    likes: 30,
    user: {
      name: "bob",
    },
    tags: [
      { id: "3", name: "web development" },
      { id: "4", name: "html" },
    ],
    comments: 5,
  },
  {
    id: "3",
    title: "Demystifying Machine Learning and Artificial Intelligence",
    slug: "demystifying-machine-learning-ai",
    description:
      "Journey into machine learning and AI with core concepts and real-world applications. Explore the future!",
    created: new Date(2023, 7, 20, 9, 15, 0),
    updated: new Date(2023, 7, 25, 16, 10, 0),
    likes: 55,
    user: {
      name: "charlie",
    },
    tags: [
      { id: "5", name: "machine learning" },
      { id: "6", name: "ai" },
    ],
    comments: 12,
  },
  {
    id: "4",
    title: "Delicious and Nutritious Cooking: Recipes for a Healthy Lifestyle",
    slug: "cooking-recipes-healthy-lifestyle",
    description:
      "Explore healthy recipes and cooking techniques to transform your culinary skills and health. Eat well!",
    created: new Date(2023, 6, 5, 14, 40, 0),
    updated: new Date(2023, 6, 9, 10, 20, 0),
    likes: 63,
    user: {
      name: "david",
    },
    tags: [
      { id: "7", name: "cooking" },
      { id: "8", name: "healthy" },
    ],
    comments: 9,
  },
  {
    id: "5",
    title: "Traveling on a budget: Tips for thrifty adventurers",
    slug: "traveling-budget-tips",
    description:
      "Discover budget-friendly travel tips and explore amazing destinations without breaking the bank. Travel smart!",
    created: new Date(2023, 5, 12, 13, 10, 0),
    updated: new Date(2023, 5, 15, 12, 30, 0),
    likes: 48,
    user: {
      name: "eve",
    },
    tags: [
      { id: "9", name: "travel" },
      { id: "10", name: "budget" },
    ],
    comments: 8,
  },
  {
    id: "6",
    title: "Photography Masterclass: Unleash Your Creative Potential",
    slug: "photography-masterclass-creative-potential",
    description:
      "Unlock the secrets of great photography with expert tips, techniques, and inspiring examples to elevate your photography game.",
    created: new Date(2023, 4, 25, 10, 50, 0),
    updated: new Date(2023, 5, 30, 17, 0, 0),
    likes: 72,
    user: {
      name: "frank",
    },
    tags: [
      { id: "11", name: "photography" },
      { id: "12", name: "tips" },
    ],
    comments: 15,
  },
  {
    id: "7",
    title: "Hiking Adventures: Discover Beautiful Trails Around the World",
    slug: "hiking-adventures-beautiful-trails",
    description:
      "Embark on a journey to explore stunning hiking trails in breathtaking natural landscapes. Find your adventure!",
    created: new Date(2023, 3, 8, 8, 30, 0),
    updated: new Date(2023, 4, 12, 14, 15, 0),
    likes: 37,
    user: {
      name: "grace",
    },
    tags: [
      { id: "13", name: "hiking" },
      { id: "14", name: "nature" },
    ],
    comments: 6,
  },
  {
    id: "8",
    title: "Gaming News and Reviews: Stay Updated on the Latest Trends",
    slug: "gaming-news-reviews-latest-trends",
    description:
      "Keep up with the latest gaming trends and discover game reviews to make informed decisions. Game on!",
    created: new Date(2023, 2, 17, 15, 25, 0),
    updated: new Date(2023, 3, 20, 10, 40, 0),
    likes: 50,
    user: {
      name: "henry",
    },
    tags: [
      { id: "15", name: "gaming" },
      { id: "16", name: "reviews" },
    ],
    comments: 11,
  },
  {
    id: "9",
    title:
      "Artistic Creations Showcase: Explore the World of Art and Creativity",
    slug: "artistic-creations-showcase-art-creativity",
    description:
      "Dive into the world of art and creativity, and be inspired by remarkable artistic creations. Get creative!",
    created: new Date(2023, 1, 28, 12, 15, 0),
    updated: new Date(2023, 3, 2, 16, 50, 0),
    likes: 44,
    user: {
      name: "ivy",
    },
    tags: [
      { id: "17", name: "art" },
      { id: "18", name: "creativity" },
    ],
    comments: 10,
  },
  {
    id: "10",
    title: "Tech Gadgets and Innovations: Discover the Latest Trends",
    slug: "tech-gadgets-innovations-latest-trends",
    description:
      "Stay updated on the latest tech gadgets and innovations that are changing the world. Get geeky!",
    created: new Date(2023, 0, 10, 9, 45, 0),
    updated: new Date(2023, 0, 13, 13, 20, 0),
    likes: 60,
    user: {
      name: "jack",
    },
    tags: [
      { id: "19", name: "technology" },
      { id: "20", name: "innovations" },
    ],
    comments: 13,
  },
];
export const mockTags = [
  { id: "tag1", name: "Technology" },
  { id: "tag2", name: "Food & Cooking" },
  { id: "tag3", name: "Travel" },
  { id: "tag4", name: "Health & Fitness" },
  { id: "tag5", name: "Science" },
  { id: "tag6", name: "Fashion" },
  { id: "tag7", name: "Business" },
  { id: "tag8", name: "Art & Design" },
  { id: "tag9", name: "Music" },
  { id: "tag10", name: "Sports" },
];
