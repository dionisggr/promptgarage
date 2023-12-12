const prompts = [
  { id: 1, title: "Brogrammer", content: "Act as en expert programmer and provide high-level code suggestions for the following problems presented.", user_id: 'demo' },
  { id: 2, title: "Literator", content: "Act as a literary expert and provide a detailed analysis of the following poems.", user_id: 'demo' },
  { id: 3, title: "Botanist", content: "Act as an expert in magical plants and fruits and describe how to plant a magical tree.", user_id: 'demo' },
  { id: 4, title: "Historian", content: "Act as a historian and describe the events leading up to the American Revolution.", user_id: 'demo' },
  { id: 5, title: "Psychologist", content: "Act as a psychologist and provide advice to the following patients.", user_id: 'demo' },
  { id: 6, title: "Physicist", content: "Act as a physicist and explain the following concepts.", user_id: 'demo' },
  { id: 7, title: "Mathematician", content: "Act as a mathematician and explain the following concepts.", user_id: 'demo' },
  { id: 8, title: "Astronomer", content: "Act as an astronomer and explain the following concepts.", user_id: 'demo' },
  { id: 9, title: "Biologist", content: "Act as a biologist and explain the following concepts.", user_id: 'demo' },
  { id: 10, title: "Chemist", content: "Act as a chemist and explain the following concepts.", user_id: 'demo' },
]

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
        value: 'Expert in magical plants and fruits',
        score: 95,
        explanation:
          'Framing the AI as an expert in magical plants can yield more detailed and specialized information.',
      },
      {
        value: 'Botanist with specialization in enchanted flora',
        score: 92,
        explanation:
          'Positioning the AI as a specialized botanist can lead to a scientifically accurate and imaginative response.',
      },
      {
        value: 'Magical horticulturist',
        score: 91,
        explanation:
          'This role suggests a blend of magical and scientific expertise in the realm of plant cultivation.',
      },
      {
        value: 'Enchanted forest guardian',
        score: 89,
        explanation:
          'Positioning as a guardian can lend a sense of protective wisdom regarding magical trees and plants.',
      },
      {
        value: 'Magical agronomist',
        score: 88,
        explanation:
          'An agronomist specializes in soil and crop production. In a magical context, this could mean understanding mystical soils and magical crop properties.',
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
        value:
          'Life cycle of an enchanted tree, including its fruiting and the benefits of its magical produce',
        score: 92,
        explanation:
          'Providing the entire life cycle context can give a comprehensive view, from growth to the benefits of its fruits.',
      },
      {
        value:
          'Stages of growth of a magical tree and the advantages of its mystical fruits',
        score: 91,
        explanation:
          "Specifying stages of growth gives a more structured context, while also focusing on the fruit's benefits.",
      },
      {
        value:
          'Magical properties of trees and the significance of their mystical fruits',
        score: 89,
        explanation:
          'This context delves into the unique properties of magical trees and the significance of their fruits.',
      },
      {
        value:
          'Journey of a magical seed to a full-grown enchanted tree bearing mystical fruits',
        score: 88,
        explanation:
          'This context narrates the journey of growth in a story-like manner.',
      },
      {
        value:
          'Life force of a magical tree and the energy contained within its fruits',
        score: 87,
        explanation:
          'This context explores the deeper, perhaps spiritual, side of magical trees and their fruits.',
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
        value:
          'Gain a comprehensive understanding of the entire planting process of an enchanted tree',
        score: 95,
        explanation:
          'Focusing on a comprehensive understanding provides depth to the planting process of the tree.',
      },
      {
        value:
          'Understand the prerequisites and steps to nurture a magical tree from seed to maturity',
        score: 94,
        explanation:
          'This goal emphasizes not just the planting but nurturing the tree to maturity.',
      },
      {
        value:
          'Acquire knowledge on the special care magical trees need in comparison to regular trees',
        score: 92,
        explanation:
          'This emphasizes the unique care and attention magical trees might need.',
      },
      {
        value:
          'Be equipped to plant and care for a magical tree in any magical ecosystem',
        score: 91,
        explanation:
          'This goal equips the learner for various scenarios or environments.',
      },
      {
        value:
          'Ensure the magical tree thrives and yields the desired mystical fruits',
        score: 90,
        explanation:
          'The emphasis here is on the outcome – a thriving tree that bears the desired fruits.',
      },
    ],
  },
  audience: {
    value: null,
    score: 0,
    tip: "Identifying the audience helps tailor the language and complexity.",
    suggestions: [
      {
        value: 'Individuals curious about magical botany',
        score: 93,
        explanation:
          'Specifying an audience curious about magical plants can lead to a more targeted and engaging response.',
      },
      {
        value: 'Aspiring magical gardeners and horticulturists',
        score: 92,
        explanation:
          'This audience might be keen on practical aspects of planting and caring for magical plants.',
      },
      {
        value: 'Fans of fantasy literature exploring real-world applications',
        score: 91,
        explanation:
          'This targets fantasy enthusiasts who enjoy diving deep into the practicalities of fantastical concepts.',
      },
      {
        value: 'Students of magical herbology and plant studies',
        score: 90,
        explanation:
          'Academic or student audiences might appreciate a more detailed or scholarly approach.',
      },
      {
        value: 'Enthusiasts of mythical and legendary flora',
        score: 89,
        explanation:
          'This audience appreciates the lore and legends surrounding magical plants.',
      },
    ],
  },
  format: {
    value: null,
    score: 0,
    tip: "Choose a format that best suits the prompt and the audience.",
    suggestions: [
      {
        value: 'Provide a detailed narrative interspersed with facts and lore',
        score: 94,
        explanation:
          'Combining narrative with facts can make the content engaging while being informative.',
      },
      {
        value: 'Present a structured guide with headings and bullet points',
        score: 93,
        explanation:
          'A structured format can help in organizing information for easier comprehension.',
      },
      {
        value:
          'Craft a visual infographic or flowchart detailing the planting process',
        score: 92,
        explanation:
          'A visual representation can make complex processes more understandable and memorable.',
      },
      {
        value:
          'Write a story or legend about the first magical tree ever planted',
        score: 91,
        explanation:
          'A story format can make the information more engaging and memorable.',
      },
      {
        value: 'Provide a checklist for planting and caring for a magical tree',
        score: 90,
        explanation:
          'A checklist format offers a practical tool for those looking to act on the information.',
      },
    ],
  },
  examples: {
    value: null,
    score: 0,
    tip: "Providing examples can help clarify or illustrate the prompt.",
    suggestions: [
      {
        value:
          'Like the Ents from Lord of the Rings or the Whomping Willow from Harry Potter',
        score: 95,
        explanation:
          'Using popular fantasy examples can provide a clearer picture of what kind of magical tree description is desired.',
      },
      {
        value: 'Similar to the Yggdrasil, the World Tree in Norse mythology',
        score: 94,
        explanation:
          'Using mythological references can give a more traditional and legendary touch to the example.',
      },
      {
        value:
          'Imagine a hybrid between the Tree of Life and a Jack and the Beanstalk scenario',
        score: 93,
        explanation:
          'Combining two known stories can create a unique and intriguing image.',
      },
      {
        value:
          'Think of the magical properties of the Deku Tree from The Legend of Zelda series',
        score: 92,
        explanation:
          'Video game references can resonate with a different subset of the audience.',
      },
      {
        value:
          "Envision a tree akin to the one in Avatar's Pandora, interlinked with all life forms",
        score: 91,
        explanation:
          'References to popular movies can provide vivid and familiar visuals.',
      },
    ],
  },
};

export default { diagnosis, prompts };
