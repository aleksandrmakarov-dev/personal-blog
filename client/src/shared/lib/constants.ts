import { Profile } from "@/entities/profile/api/profileApi";
import { PostCardDTO } from ".";
import { PostDTO } from "@/services/post/postService";
import { TagDTO } from "@/services/tag/tagService";

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
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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
      id: "7",
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
      id: "8",
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
      id: "9",
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
      id: "10",
      name: "Jack Black",
    },
    tags: [
      { id: "19", name: "technology" },
      { id: "20", name: "innovations" },
    ],
    comments: 13,
  },
];
export const mockTags: TagDTO[] = [
  { id: "tag1", name: "Technology", slug: "technology" },
  { id: "tag2", name: "Food & Cooking", slug: "food-cooking" },
  { id: "tag3", name: "Travel", slug: "travel" },
  { id: "tag4", name: "Health & Fitness", slug: "health-fitness" },
  { id: "tag5", name: "Science", slug: "science" },
  { id: "tag6", name: "Fashion", slug: "fashion" },
  { id: "tag7", name: "Business", slug: "business" },
  { id: "tag8", name: "Art & Design", slug: "art-design" },
  { id: "tag9", name: "Music", slug: "music" },
  { id: "tag10", name: "Sports", slug: "sports" },
];

export const mockProfile: Profile = {
  image: "https://i.pravatar.cc/300",
  name: "Alice Smith",
  email: "alice.smith@example.com",
  bio: "I'm a software engineer and aspiring blogger. I love coding and writing about programming.",
  slug: "test-user",
};

export const mockPost: PostDTO = {
  id: "1a2b3c4d",
  slug: "sample-article",
  title: "The Impact of Renewable Energy on Climate Change",
  description:
    "Explore the role of renewable energy sources in combating climate change and reducing carbon emissions.",
  body: "# The Pervasive Influence of Technology\n\nIn today's society, technology has become more than a mere tool; it’s an intricate part of our lives, shaping how we interact, work, and perceive the world.\n\n ## Table of Contents \n\n ## The Impact of Artificial Intelligence\n\nArtificial Intelligence (AI) stands as a pinnacle of modern innovation. It's the driving force behind automation, machine learning, and predictive analytics, revolutionizing industries.\n\n### Embracing AI for Transformative Change\n\nBusinesses leverage AI for data analysis, optimizing decision-making, and streamlining operations. Its impact on fields like healthcare, finance, and manufacturing is profound.\n\n## The Era of IoT\n\nThe Internet of Things (IoT) has transformed connectivity, intertwining devices in ways that were unimaginable a few decades ago.\n\n### Ubiquitous Connectivity Through IoT\n\nFrom smart homes to industrial automation, IoT has permeated numerous sectors, enhancing efficiency, productivity, and paving the way for a more interconnected future.\n\n## The Blockchain Revolution\n\nBlockchain technology isn't just synonymous with cryptocurrencies; its decentralized nature ensures secure, transparent transactions, promising transformations in numerous sectors beyond finance.\n\n### Beyond Bitcoin: Blockchain's Applications\n\nFrom supply chain management to voting systems, blockchain’s tamper-proof and decentralized nature redefines trust and security in a digital landscape.\n\n## Quantum Computing's Promise\n\nThe nascent technology of quantum computing holds the promise of unparalleled computational power.\n\n### Quantum Supremacy and Its Potential\n\nQuantum computing's ability to solve complex problems has vast implications, from drug discovery to optimizing processes in a multitude of industries.\n\n## The Open-Source Community\n\nThe open-source community embodies collaboration, driving collective efforts towards innovation.\n\n### Community-Driven Development\n\nProjects like Linux, TensorFlow, and Kubernetes epitomize the power of collective development, fostering technological advancements.\n\n## Cloud Computing's Dominance\n\nCloud computing is reshaping the operational landscape for businesses, offering scalability, cost-efficiency, and flexibility.\n\n### The Shift to Cloud Infrastructure\n\nFrom startups to large enterprises, cloud computing has become the backbone of modern tech infrastructure, empowering businesses with agility and resource optimization.\n\n## The Future Envisioned: Virtual and Augmented Reality\n\nThe future is rife with possibilities in the realms of virtual and augmented reality.\n\n### Reimagining Experiences with VR and AR\n\nFrom immersive entertainment to revolutionizing educational tools and enhancing healthcare experiences, these technologies redefine our interactions with the digital world.\n\n## Big Data and Machine Learning Synergy\n\nThe backbone of numerous technological advancements is big data, supported by machine learning algorithms.\n\n### Powering Intelligent Decisions\n\nMachine learning-driven insights are the cornerstone of industries, empowering informed decision-making and predictive analytics.\n\n# Embracing the Unpredictable Technological Future\n\nThe relentless march of technology promises further astonishing breakthroughs, urging us to adapt and embrace the evolving landscape.\n## Cybersecurity and its Vital Role\n\nAmidst the technological revolution, cybersecurity stands as a crucial shield against emerging threats.\n\n### Nurturing Digital Safety\n\nAs technology advances, the need for robust cybersecurity measures intensifies, safeguarding individuals, businesses, and nations from potential risks.\n\n## Ethical Considerations in Technology Development\n\nThe ethical implications of technological advancements prompt discussions and calls for responsible innovation.\n\n### Responsible Tech Innovation\n\nAddressing privacy concerns, ethical AI development, and fair use of data is pivotal to ensure technology serves society without compromising fundamental rights.\n\n## Sustainable Technology Adoption\n\nThe pursuit of innovation goes hand in hand with the need for sustainable practices.\n\n### Technology and Environmental Impact\n\nAdopting eco-friendly practices and developing technologies that minimize environmental impact are critical for a sustainable future.\n\n# Conclusion: Embracing Change\n\nTechnology's rapid evolution is both exhilarating and challenging, urging us to adapt, innovate, and adopt a conscientious approach toward the transformative power it holds.\n# The Transformative Realm of Technology\n\nIn the modern landscape, technology reigns supreme, reshaping industries and daily life alike.\n\n## The Impact of Artificial Intelligence\n\nArtificial Intelligence (AI) revolutionizes automation and predictive analytics across sectors.\n\n### Embracing AI for Change\n\nBusinesses harness AI for data analysis, optimizing decision-making processes and operational efficiency.\n\n## The Era of IoT\n\nThe Internet of Things (IoT) intertwines devices, enhancing connectivity and transforming various domains.\n\n### Ubiquitous Connectivity Through IoT\n\nIoT applications span from smart homes to industrial automation, optimizing productivity and interconnectivity.\n\n## The Blockchain Revolution\n\nBlockchain technology ensures secure, transparent transactions, extending its influence beyond cryptocurrencies.\n\n### Applications Beyond Finance\n\nBlockchain disrupts supply chain management and establishes trust in various systems beyond financial transactions.\n\n## Quantum Computing's Promise\n\nQuantum computing's potential for solving complex problems offers vast possibilities.\n\n### Quantum Supremacy and Industry Impact\n\nFrom healthcare advancements to optimizing complex processes, quantum computing's potential is immense.\n\n## The Open-Source Community\n\nCollaboration defines the open-source community, fostering collective innovation.\n\n### Community-Driven Development\n\nLinux, TensorFlow, and Kubernetes exemplify collaborative development and technological progress.\n\n| Advantages of Open Source   |      Value             |\n|-----------------------------|--------------------|\n| Community-driven innovation |          3          |\n| Transparency and trust      |        5            |\n| Cost-effectiveness          |          6          |\n\n![Virtual Reality](https://via.placeholder.com/500x300)\n\n## Cloud Computing's Dominance\n\nCloud computing offers scalability, cost-efficiency, and flexibility, transforming businesses.\n\n### The Shift to Cloud Infrastructure\n\nBusinesses leverage cloud resources, ensuring agility and optimal resource utilization.\n\n## The Future Envisioned: VR and AR\n\nVirtual and Augmented Reality redefine experiences across various sectors.\n\n### Redefining Interactions\n\nFrom immersive entertainment to educational tools, VR and AR transform user experiences.\n\n| VR & AR in Industries         |                    |\n|-------------------------------|--------------------|\n| Entertainment                 |                    |\n| Education                     |                    |\n| Healthcare                    |                    |\n\n![Augmented Reality](https://via.placeholder.com/500x300)\n\n## Big Data and Machine Learning\n\nBig data, fueled by machine learning, drives insights and informed decision-making.\n\n### Empowering Insights\n\nMachine learning algorithms power intelligent decisions across industries.\n\n# Embracing the Unpredictable Technological Future\n\nThe relentless march of technology holds promises and challenges, urging adaptability and innovation.\n# The Technological Revolution: Innovations and Impacts\n\nTechnology today stands as the cornerstone of innovation, reshaping industries and daily life in unprecedented ways.\n\n## Artificial Intelligence: Powering Transformation\n\nArtificial Intelligence (AI) drives automation and predictive analytics across diverse sectors.\n\n### Embracing AI for Change\n\nBusinesses harness AI for [data analysis](https://www.example.com/data-analysis), optimizing decision-making processes and operational efficiency.\n\n## The Era of IoT: A Networked World\n\nThe Internet of Things (IoT) intertwines devices, enhancing connectivity and transforming various domains.\n\n### Ubiquitous Connectivity Through IoT\n\nIoT applications span from smart homes to industrial automation, optimizing productivity and interconnectivity.\n\n## Blockchain: Beyond Currency\n\nBlockchain technology ensures secure, transparent transactions, extending its influence beyond cryptocurrencies.\n\n### Applications Beyond Finance\n\nBlockchain disrupts [supply chain management](https://www.example.com/supply-chain) and establishes trust in various systems.\n\n## Quantum Computing: Pioneering Power\n\nQuantum computing's potential for solving complex problems offers vast possibilities.\n\n### Quantum Supremacy and Industry Impact\n\nFrom healthcare advancements to optimizing complex processes, quantum computing's potential is immense.\n\n## The Open-Source Community: A Collaboration Paradigm\n\nCollaboration defines the open-source community, fostering collective innovation.\n\n### Community-Driven Development\n\n [Linux](https://www.linux.org/), [TensorFlow](https://www.tensorflow.org/), and [Kubernetes](https://kubernetes.io/) exemplify collaborative development and technological progress.\n\n| Advantages of Open Source   |                    |\n|-----------------------------|--------------------|\n| Community-driven innovation |                    |\n| Transparency and trust      |                    |\n| Cost-effectiveness          |                    |\n\n![Virtual Reality](https://via.placeholder.com/500x300)\n\n## Cloud Computing: Shaping Business Landscapes\n\nCloud computing offers scalability, cost-efficiency, and flexibility, transforming businesses.\n\n### The Shift to Cloud Infrastructure\n,nBusinesses leverage cloud resources, ensuring agility and optimal resource utilization.\n\n## The Future Envisioned: VR and AR\n\nVirtual and Augmented Reality redefine experiences across various sectors.\n\n### Redefining Interactions\n\nFrom immersive entertainment to educational tools, VR and AR transform user experiences.\n\n| VR & AR in Industries         |                    |\n|-------------------------------|--------------------|\n| Entertainment                 |                    |\n| Education                     |                    |\n| Healthcare                    |                    |\n\n![Augmented Reality](https://via.placeholder.com/500x300)\n\n## Big Data and Machine Learning: Powering Insights\n\nBig data, fueled by machine learning, drives insights and informed decision-making.\n\n### Empowering Insights\n\nMachine learning algorithms power intelligent decisions across industries.\n\n# Embracing the Unpredictable Technological Future\n\nThe relentless march of technology holds promises and challenges, urging adaptability and innovation.\n",
  image: "https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_1280.jpg",
  created: new Date("2023-11-04T12:00:00Z"),
  updated: new Date("2023-11-04T14:30:00Z"),
  likes: 87,
  author: {
    username: "test-user",
    bio: "I'm a software engineer and aspiring blogger. I love coding and writing about programming.",
    image: "https://i.pravatar.cc/300",
    following: false,
    slug: "test-user",
  },
  tags: [mockTags[0].id, mockTags[1].id, mockTags[2].id],
  isLiked: false,
};
