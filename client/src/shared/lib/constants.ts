import { PostCardDTO } from ".";
import { Profile } from "../../entities/profile";
import { PostDTO } from "./types";

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
      name: "Alice Smith",
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
      name: "Bob Johnson",
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
      name: "Charlie Brown",
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
      name: "David Miller",
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
      name: "Eve Jackson",
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
      name: "Frank Clar",
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
      name: "Grace Lee",
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
      name: "Henry Ford",
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
      name: "Ive Fisher",
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
      name: "Jack Black",
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

export const mockProfile: Profile = {
  image: "https://i.pravatar.cc/300",
  name: "Alice Smith",
  email: "alice.smith@example.com",
  bio: "I'm a software engineer and aspiring blogger. I love coding and writing about programming.",
};

export const mockPost: PostDTO = {
  id: "1a2b3c4d",
  slug: "sample-article",
  title: "The Impact of Renewable Energy on Climate Change",
  description:
    "Explore the role of renewable energy sources in combating climate change and reducing carbon emissions.",
  body: '# Heading level 1\n## Heading level 2\n### Heading level 3\n#### Heading level 4\n##### Heading level 5\n###### Heading level 6\nI really like using Markdown.\nI think I\'ll use it to format all of my documents from now on.\nI just love **bold text**.\nItalicized text is the *cat\'s meow*.\nThis text is ***really important***.\n> Dorothy followed her through many of the beautiful rooms in her castle.\n> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.\n> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.\n## Hey!\n> #### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**.\n1. First item\n2. Second item\n3. Third item\n4. Fourth item\n- First item\n- Second item\n- Third item\n- Fourth item  \n\nAt the command prompt, type `nano`.  \n\nMy favorite search engine is [Duck Duck Go](https://duckduckgo.com).  \n\n![The San Juan Mountains are beautiful!](https://www.markdownguide.org/assets/images/san-juan-mountains.jpg "San Juan Mountains")  \n\n[![An old rock in the desert](https://www.markdownguide.org/assets/images/shiprock.jpg "Shiprock, New Mexico by Beau Rogers")](https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv)  \n| Syntax      | Description |\n| ----------- | ----------- |\n| Header      | Title       |\n| Paragraph   | Text        |\n```json\n{\n"firstName": "John",\n"lastName": "Smith",\n"age": 25\n}\n```\n- [x] Write the press release\n- [ ] Update the website\n- [ ] Contact the media\n```csharp\nswitch(variable)\n{\ncase value1:\nexecuteThis();\nexecuteThat();\nbreak;\n\ncase value2:\nexecuteThisOtherThing();\nbreak;\n\ndefault:\nbreak;\n}\n```',
  image: "https://example.com/sample-image.jpg",
  created: new Date("2023-11-04T12:00:00Z"),
  updated: new Date("2023-11-04T14:30:00Z"),
  likes: 87,
  user: {
    name: "John Doe",
  },
  tags: [mockTags[0], mockTags[1], mockTags[2]],
  comments: 42,
};
