const prompts = [
  {
    id: 1,
    title: "Brogrammer",
    content: "Embody the role of an expert programmer, known for your extensive knowledge in diverse programming languages and cutting-edge software development practices. Provide high-level code suggestions, innovative programming solutions, and best practices for optimizing code in response to a variety of complex problems presented by users. Offer insights into the latest trends in software development, including AI, machine learning, and cloud computing.",
    user_id: 'demo'
  },
  {
    id: 2,
    title: "Literator",
    content: "Assume the persona of a literary expert with a deep understanding of various literary genres, styles, and historical contexts. Provide a detailed and nuanced analysis of selected poems, exploring themes, literary devices, historical significance, and authorial intent. Offer insights into the poem's place within its literary movement, its influence on subsequent works, and its reception both at the time of publication and in the modern era.",
    user_id: 'demo'
  },
  {
    id: 3,
    title: "Botanist",
    content: "Channel the knowledge of an expert in magical plants and fruits, providing detailed guidance on cultivating and caring for a magical tree. Describe the unique properties of this tree, the mystical benefits it offers, the ideal environmental conditions for its growth, and the intricate rituals or care practices needed. Explain how this tree interacts with its ecosystem and any mythical creatures or phenomena associated with it.",
    user_id: 'demo'
  },
  {
    id: 4,
    title: "Historian",
    content: "Act as a historian with a specialty in American history, detailing the events leading up to the American Revolution. Discuss the political, social, and economic factors that contributed to the growing tensions between the American colonies and Britain. Provide insights into key figures, pivotal events, and ideological shifts that played a crucial role in the escalation towards revolution.",
    user_id: 'demo'
  },
  {
    id: 5,
    title: "Psychologist",
    content: "Embody the role of a psychologist, offering professional and compassionate advice to patients presenting a variety of mental health challenges. Use evidence-based practices to provide guidance, coping strategies, and therapeutic insights tailored to each patient's unique circumstances. Discuss the importance of mental health, self-care, and the role of psychology in understanding and improving human behavior.",
    user_id: 'demo'
  },
  {
    id: 6,
    title: "Physicist",
    content: "Assume the identity of a physicist, equipped to explain complex physical phenomena and theories. Tackle concepts ranging from classical mechanics to quantum physics, providing clear, accessible explanations that demystify intricate principles. Discuss recent advancements in the field and how these developments have reshaped our understanding of the universe.",
    user_id: 'demo'
  },
  {
    id: 7,
    title: "Mathematician",
    content: "Act as a mathematician, elucidating various mathematical concepts with clarity and precision. Break down complex theories and problems into understandable segments, drawing on examples from real-world applications. Discuss the beauty and elegance of mathematical thinking, and its pivotal role in advancing science and technology.",
    user_id: 'demo'
  },
  {
    id: 8,
    title: "Astronomer",
    content: "Channel the expertise of an astronomer, explaining cosmic phenomena and celestial mechanics. Discuss the latest discoveries in astronomy, the technology used in space exploration, and the mysteries of the universe that continue to intrigue scientists. Provide insights into the study of planets, stars, galaxies, and the cosmic web that connects them all.",
    user_id: 'demo'
  },
  {
    id: 9,
    title: "Biologist",
    content: "Embody the role of a biologist, adept at explaining complex biological concepts. Dive into the intricacies of cellular processes, genetics, ecology, and evolution. Discuss the latest research in biology, its implications for understanding life on Earth, and the potential applications in medicine, environmental science, and biotechnology.",
    user_id: 'demo'
  },
  {
    id: 10,
    title: "Chemist",
    content: "Assume the identity of a chemist, capable of explaining intricate chemical reactions and processes. Discuss the foundational principles of chemistry, its practical applications in everyday life, and the latest innovations in the field. Provide insights into the role of chemistry in solving global challenges, such as energy production, environmental protection, and healthcare.",
    user_id: 'demo'
  },
];

const tuneup = {
  paragraph: "In a one-shot strategy, assume the role of a seasoned travel guide. You have extensive knowledge about various global destinations, their cultures, histories, and hidden gems. Your task is to craft a personalized travel itinerary based on specific preferences and interests provided by the user. Provide detailed recommendations for destinations, activities, and local experiences, ensuring that each suggestion aligns with the user's interests and travel style. The goal is to create an engaging and feasible travel plan that offers a blend of popular attractions and unique, off-the-beaten-path experiences. Your audience comprises adventurous travelers seeking personalized guidance. The format should be a well-structured itinerary with day-by-day plans, including brief descriptions of each suggested activity or destination. For example, 'Day 1: Explore the historic streets of Rome, visiting the Colosseum and Trevi Fountain, followed by an authentic Italian dinner at a local trattoria.' 'Day 2: Take a day trip to the scenic town of Tivoli, experiencing the beautiful Villa d'Este gardens.",
  structured: {
    strategy: 'One-shot strategy.',
    role: 'Assume the role of a seasoned travel guide.',
    context: 'Consider extensive knowledge about various global destinations, cultures, histories, and hidden gems.',
    task: 'Craft a personalized travel itinerary.',
    instructions: 'Provide detailed recommendations for destinations, activities, and local experiences based on the user\'s preferences.',
    goal: 'Create an engaging and feasible travel plan with a mix of popular and unique experiences.',
    audience: 'Adventurous travelers seeking personalized guidance.',
    format: 'A well-structured itinerary with day-by-day plans and brief descriptions of each activity or destination.',
    examples: "For example: '''Day 1: Explore the historic streets of Rome, visiting the Colosseum and Trevi Fountain, followed by an authentic Italian dinner at a local trattoria. Day 2: Take a day trip to the scenic town of Tivoli, experiencing the beautiful Villa d\'Este gardens.'''",
  },
}

const diagnosis = {
  strategy: {
    value: 'instruction prompting, general knowledge, chain of thought',
    score: 70,
    tip: "Consider switching more strategies to improve the accuracy in the response.",
    suggestions: [
      {
        value: 'few-shot, instruction prompting, chain of thought',
        score: 95,
        explanation:
          'Few-shot can be combined with instruction prompting to provide specific steps and explanations, leveraging the chain of thought for logical progression.',
      },
      {
        value: 'active prompt, instruction prompting, chain of thought',
        score: 93,
        explanation:
          'Active prompt can guide the AI to actively seek information, instruction prompting can direct the response, and chain of thought can ensure a logical progression.',
      },
      {
        value: 'role prompting, instruction prompting, chain of thought',
        score: 92,
        explanation:
          "Role prompting can frame the AI's response, combined with instruction prompting to guide it, and chain of thought to provide structure.",
      },
      {
        value: 'one-shot, instruction prompting, chain of thought',
        score: 91,
        explanation:
          'One-shot can help give a singular example, with instruction prompting guiding the explanation, using chain of thought for organized thinking.',
      },
      {
        value: 'zero-shot, instruction prompting, chain of thought',
        score: 90,
        explanation:
          'Zero-shot allows for on-the-fly understanding without prior examples, combined with instruction prompting and chain of thought to structure the explanation.',
      },
    ],
  },
  role: {
    value: null,
    score: 0,
    tip: "Defining a role adds specificity and context to the prompt.",
    suggestions: [
      {
        value: 'Act as an expert in magical plants and fruits',
        score: 95,
        explanation: 'Framing the AI as an expert in magical plants can yield more detailed and specialized information.',
      },
      {
        value: 'Embody a botanist with specialization in enchanted flora',
        score: 92,
        explanation: 'Positioning the AI as a specialized botanist can lead to a scientifically accurate and imaginative response.',
      },
      {
        value: 'Take on the role of a magical horticulturist',
        score: 91,
        explanation: 'This role suggests a blend of magical and scientific expertise in the realm of plant cultivation.',
      },
      {
        value: 'Adopt the persona of an enchanted forest guardian',
        score: 89,
        explanation: 'Positioning as a guardian can lend a sense of protective wisdom regarding magical trees and plants.',
      },
      {
        value: 'Become a magical agronomist',
        score: 88,
        explanation: 'An agronomist specializes in soil and crop production. In a magical context, this could mean understanding mystical soils and magical crop properties.',
      },
    ],    
  },
  context: {
    value:
      'ripening process of a magical tree, benefits of consuming mystical fruits',
    score: 80,
    tip: "Ensure the context is relevant and provides enough background.",
    suggestions: [
      {
        value: 'Consider the life cycle of an enchanted tree, including its fruiting and the benefits of its magical produce',
        score: 92,
        explanation: 'Providing the entire life cycle context can give a comprehensive view, from growth to the benefits of its fruits.',
      },
      {
        value: 'Take into consideration the stages of growth of a magical tree and the advantages of its mystical fruits',
        score: 91,
        explanation: "Specifying stages of growth gives a more structured context, while also focusing on the fruit's benefits.",
      },
      {
        value: 'Some useful information: magical properties of trees and the significance of their mystical fruits',
        score: 89,
        explanation: 'This context delves into the unique properties of magical trees and the significance of their fruits.',
      },
      {
        value: 'Reflect on the journey of a magical seed to a full-grown enchanted tree bearing mystical fruits',
        score: 88,
        explanation: 'This context narrates the journey of growth in a story-like manner.',
      },
      {
        value: 'Consider the life force of a magical tree and the energy contained within its fruits',
        score: 87,
        explanation: 'This context explores the deeper, perhaps spiritual, side of magical trees and their fruits.',
      },
    ],
  },
  task: {
    value: 'Describe how to plant a magical tree',
    score: 80,
    tip: "Make sure the task is clear, specific, and actionable.",
    suggestions: [
      {
        value:
          'Detail the steps to successfully plant and cultivate an enchanted tree',
        score: 95,
        explanation:
          'Detailing the steps ensures a thorough understanding from planting to maturation.',
      },
      {
        value:
          'Explain the necessary care for a magical tree from seedling to fruit-bearing stage',
        score: 93,
        explanation:
          'This task emphasizes the care and nurturing of the magical tree throughout its life cycle.',
      },
      {
        value:
          'Describe the rituals and methods to grow a healthy enchanted tree',
        score: 92,
        explanation:
          'Introducing the concept of rituals adds a layer of mystique to the planting process.',
      },
      {
        value:
          'Provide a step-by-step guide to planting and nurturing a magical tree',
        score: 91,
        explanation:
          "A step-by-step guide offers a structured approach to understanding the tree's growth.",
      },
      {
        value:
          'Outline the essentials of growing a magical tree and ensuring its mystical fruits flourish',
        score: 90,
        explanation:
          'This task focuses on the essentials, providing a concise yet comprehensive guide.',
      },
    ],
  },
  instructions: {
    value: 'Explain the process',
    score: 80,
    tip: "Consider asking for additional details or series of steps for improved clarity and understanding.",
    suggestions: [
      {
        value: 'Walk me through the process with vivid details',
        score: 93,
        explanation:
          'Requesting vivid details can help in eliciting a rich and descriptive response.',
      },
      {
        value: 'Ensure each step is clear and easy to follow',
        score: 92,
        explanation:
          'Emphasizing clarity ensures each step is comprehensible and actionable.',
      },
      {
        value: 'Elaborate on the importance of each step in the process',
        score: 91,
        explanation:
          'Highlighting the importance of each step can provide a deeper understanding of the process.',
      },
      {
        value: 'Use analogies or metaphors to make the process more relatable',
        score: 89,
        explanation:
          'Using analogies or metaphors can help make complex or unfamiliar processes more understandable.',
      },
      {
        value: 'Include any precautions or common mistakes to avoid',
        score: 88,
        explanation:
          'Highlighting precautions and pitfalls ensures a more successful execution of the process.',
      },
    ],
  },
  goal: {
    value: 'Describe how to plant a magical tree',
    score: 80,
    tip: "The goal should be clear, focused, and well-defined.",
    suggestions: [
      {
        value: 'The goal is to gain a comprehensive understanding of the entire planting process of an enchanted tree',
        score: 95,
        explanation: 'Focusing on a comprehensive understanding provides depth to the planting process of the tree.',
      },
      {
        value: 'Aim to understand the prerequisites and steps to nurture a magical tree from seed to maturity',
        score: 94,
        explanation: 'This goal emphasizes not just the planting but nurturing the tree to maturity.',
      },
      {
        value: 'Seek to acquire knowledge on the special care magical trees need in comparison to regular trees',
        score: 92,
        explanation: 'This emphasizes the unique care and attention magical trees might need.',
      },
      {
        value: 'Strive to be equipped to plant and care for a magical tree in any magical ecosystem',
        score: 91,
        explanation: 'This goal equips the learner for various scenarios or environments.',
      },
      {
        value: 'Ensure the magical tree thrives and yields the desired mystical fruits',
        score: 90,
        explanation: 'The emphasis here is on the outcome – a thriving tree that bears the desired fruits.',
      },
    ],
  },
  audience: {
    value: null,
    score: 0,
    tip: "Identifying the audience helps tailor the language and complexity.",
    suggestions: [
      {
        value: 'Target individuals curious about magical botany',
        score: 93,
        explanation: 'Specifying an audience curious about magical plants can lead to a more targeted and engaging response.',
      },
      {
        value: 'Aim your response at aspiring magical gardeners and horticulturists',
        score: 92,
        explanation: 'This audience might be keen on practical aspects of planting and caring for magical plants.',
      },
      {
        value: 'Direct your content to fans of fantasy literature exploring real-world applications',
        score: 91,
        explanation: 'This targets fantasy enthusiasts who enjoy diving deep into the practicalities of fantastical concepts.',
      },
      {
        value: 'Gear your response towards students of magical herbology and plant studies',
        score: 90,
        explanation: 'Academic or student audiences might appreciate a more detailed or scholarly approach.',
      },
      {
        value: 'Focus on enthusiasts of mythical and legendary flora',
        score: 89,
        explanation: 'This audience appreciates the lore and legends surrounding magical plants.',
      },
    ],
  },
  format: {
    value: null,
    score: 0,
    tip: "Choose a format that best suits the prompt and the audience.",
    suggestions: [
      {
        value: 'In your response, provide a detailed narrative interspersed with facts and lore to create an engaging and informative experience.',
        score: 94,
        explanation: 'Combining narrative with facts can make the content engaging while being informative.',
      },
      {
        value: 'Present your information in a structured guide format with clear headings and bullet points for easy comprehension.',
        score: 93,
        explanation: 'A structured format can help in organizing information for easier comprehension.',
      },
      {
        value: 'Craft a response in the form of a visual infographic or flowchart detailing the planting process of a magical tree.',
        score: 92,
        explanation: 'A visual representation can make complex processes more understandable and memorable.',
      },
      {
        value: 'Compose your answer as a story or legend about the first magical tree ever planted, making the information engaging and memorable.',
        score: 91,
        explanation: 'A story format can make the information more engaging and memorable.',
      },
      {
        value: 'Provide your advice in the form of a checklist for planting and caring for a magical tree, offering a practical guide for implementation.',
        score: 90,
        explanation: 'A checklist format offers a practical tool for those looking to act on the information.',
      },
    ],
  },
  examples: {
    value: null,
    score: 0,
    tip: "Providing examples can help clarify or illustrate the prompt.",
    suggestions: [
      {
        value: 'Use the following as examples: Ents from Lord of the Rings, Whomping Willow from Harry Potter.',
        score: 95,
        explanation: 'Using popular fantasy examples can provide a clearer picture of what kind of magical tree description is desired.',
      },
      {
        value: 'Include examples similar to Yggdrasil, the World Tree in Norse mythology.',
        score: 94,
        explanation: 'Using mythological references can give a more traditional and legendary touch to the example.',
      },
      {
        value: 'Imagine a hybrid between the Tree of Life and a Jack and the Beanstalk scenario as examples.',
        score: 93,
        explanation: 'Combining two known stories can create a unique and intriguing image.',
      },
      {
        value: 'Consider the magical properties of the Deku Tree from The Legend of Zelda series as an example.',
        score: 92,
        explanation: 'Video game references can resonate with a different subset of the audience.',
      },
      {
        value: 'Envision a tree akin to the one in Avatar\'s Pandora, interlinked with all life forms, as an example.',
        score: 91,
        explanation: 'References to popular movies can provide vivid and familiar visuals.',
      },
    ],
  },
};

export default { diagnosis, tuneup, prompts };
