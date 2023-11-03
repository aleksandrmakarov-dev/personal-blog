import { PostCardDTO } from ".";

export const mockPosts: PostCardDTO[] = [
  {
    title: "Introduction to Programming",
    description: "A beginner's guide to programming concepts.",
    image:
      "https://pixabay.com/get/gd1cf070ddadf1b82350ad5067ddfe7b35541512da31a8dd8911647148135a28be14dd795a9c8f9bb99dff5c6b3e7bf86559815b8281ecb99b1f4a350af0eef10c2f34ba60b7af6872e0cd61a7392380c_640.jpg",
    created: new Date("2023-10-01T08:00:00Z"),
    likes: 42,
    user: {
      name: "Alice",
    },
    tags: [{ name: "Programming" }, { name: "Beginner" }],
    comments: 7,
  },
  {
    title: "Web Development Basics",
    description: "Learn the fundamentals of web development.",
    created: new Date("2023-09-15T11:20:00Z"),
    updated: new Date("2023-09-18T14:45:00Z"),
    likes: 30,
    user: {
      name: "Bob",
    },
    tags: [{ name: "Web Development" }, { name: "HTML" }],
    comments: 5,
  },
  {
    title: "Machine Learning Essentials",
    description: "A crash course in machine learning and AI.",
    created: new Date("2023-08-20T09:15:00Z"),
    updated: new Date("2023-08-25T16:10:00Z"),
    likes: 55,
    user: {
      name: "Charlie",
    },
    tags: [{ name: "Machine Learning" }, { name: "AI" }],
    comments: 12,
  },
  {
    title: "Healthy Cooking Tips",
    description:
      "Explore recipes and cooking techniques for a healthy lifestyle.",
    created: new Date("2023-07-05T14:40:00Z"),
    updated: new Date("2023-07-09T10:20:00Z"),
    likes: 63,
    user: {
      name: "David",
    },
    tags: [{ name: "Cooking" }, { name: "Healthy" }],
    comments: 9,
  },
  {
    title: "Traveling on a Budget",
    description: "Tips for budget-friendly travel adventures.",
    created: new Date("2023-06-12T13:10:00Z"),
    likes: 48,
    user: {
      name: "Eve",
    },
    tags: [{ name: "Travel" }, { name: "Budget" }],
    comments: 8,
  },
  {
    title: "Photography Masterclass",
    description: "Unlock the secrets of great photography.",
    created: new Date("2023-05-25T10:50:00Z"),
    likes: 72,
    user: {
      name: "Frank",
    },
    tags: [{ name: "Photography" }, { name: "Tips" }],
    comments: 15,
  },
  {
    title: "Hiking Adventures",
    description: "Discover beautiful hiking trails around the world.",
    created: new Date("2023-04-08T08:30:00Z"),
    updated: new Date("2023-04-12T14:15:00Z"),
    likes: 37,
    user: {
      name: "Grace",
    },
    tags: [{ name: "Hiking" }, { name: "Nature" }],
    comments: 6,
  },
  {
    title: "Gaming News and Reviews",
    description: "Stay updated on the latest gaming trends and reviews.",
    created: new Date("2023-03-17T15:25:00Z"),
    updated: new Date("2023-03-20T10:40:00Z"),
    likes: 50,
    user: {
      name: "Henry",
    },
    tags: [{ name: "Gaming" }, { name: "Reviews" }],
    comments: 11,
  },
  {
    title: "Artistic Creations Showcase",
    description: "Explore the world of art and creativity.",
    created: new Date("2023-02-28T12:15:00Z"),
    updated: new Date("2023-03-02T16:50:00Z"),
    likes: 44,
    user: {
      name: "Ivy",
    },
    tags: [{ name: "Art" }, { name: "Creativity" }],
    comments: 10,
  },
  {
    title: "Tech Gadgets and Innovations",
    description: "Discover the latest tech gadgets and innovations.",
    created: new Date("2023-01-10T09:45:00Z"),
    updated: new Date("2023-01-13T13:20:00Z"),
    likes: 60,
    user: {
      name: "Jack",
    },
    tags: [{ name: "Technology" }, { name: "Innovations" }],
    comments: 13,
  },
];
