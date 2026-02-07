
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const childMaterials = [
  {
    id: "class-1",
    title: "Class 1: The Magical World of Water",
    content: "For Kids: Learn how water travels in a circle from the sky to the rivers and back! We'll do a fun experiment to make your own mini-rain cloud in a jar. For Seniors: Explore how local water cycles impact community gardens and the simple, effective ways to conserve water at home and in the garden, like using rain barrels."
  },
  {
    id: "class-2",
    title: "Class 2: Our Animal Friends",
    content: "For Kids: Discover where different animals live, from the jungle to the sea. We'll learn their sounds and create animal masks. For Seniors: Learn about the importance of native wildlife to local ecosystems and how to create a wildlife-friendly backyard that can become a certified habitat."
  },
  {
    id: "class-3",
    title: "Class 3: The Power of Plants",
    content: "For Kids: Find out how tiny seeds grow into big trees! We'll plant our own bean seed and watch it sprout. For Seniors: Delve into the benefits of companion planting in vegetable gardens to deter pests naturally and improve soil health, a timeless and effective organic gardening technique."
  },
  {
    id: "class-4",
    title: "Class 4: The Secrets of Soil",
    content: "For Kids: Let's get our hands dirty and learn about the wiggling worms and tiny bugs that make our soil healthy for plants. For Seniors: Understand the science of composting, from balancing 'greens' and 'browns' to creating nutrient-rich humus that will invigorate your garden soil."
  },
  {
    id: "class-5",
    title: "Class 5: Reduce, Reuse, Recycle Rangers",
    content: "For Kids: Become a recycling superhero! Learn what goes in which bin with a fun sorting game. For Seniors: Get practical advice on reducing household waste beyond the basics, including tips on refusing single-use plastics and repairing items to extend their life."
  },
  {
    id: "class-6",
    title: "Class 6: Wonderful Weather & Climate",
    content: "For Kids: Why is there rain, sun, and snow? We'll make a colorful rainbow and learn how weather works. For Seniors: Discuss the observable changes in local weather patterns over the decades and how community science programs track these changes."
  },
  {
    id: "class-7",
    title: "Class 7: Our Amazing Oceans",
    content: "For Kids: Dive into the deep blue sea and meet the amazing creatures that live there, from giant whales to tiny plankton. For Seniors: Explore the crucial role of oceans in regulating global climate and the impact of conservation efforts on marine sanctuaries."
  },
  {
    id: "class-8",
    title: "Class 8: The Buzz about Bees and Bugs",
    content: "For Kids: Learn why bees are so important for our food and flowers. We'll build a simple 'bug hotel' for our gardens. For Seniors: Discover the art of creating a dedicated pollinator garden with native plants that bloom across seasons, supporting bees, butterflies, and other vital insects."
  },
  {
    id: "class-9",
    title: "Class 9: Energy Explorers - Sun, Wind, and Water",
    content: "For Kids: Discover how we can power our homes using the sun, wind, and water. Build a mini-windmill! For Seniors: Get a clear overview of residential solar panel options, including potential costs, savings, and the process of connecting to the grid."
  },
  {
    id: "class-10",
    title: "Class 10: Becoming a Planet Protector",
    content: "For Kids: You're a Planet Protector! We'll make a pledge and design a poster to help others learn how to care for our Earth. For Seniors: Learn about local environmental volunteer opportunities and how to become an advocate for green policies in your community."
  },
];


const adultMaterials = [
    {
        id: 'adult-topic-1',
        title: 'Sustainable Living & Reducing Your Carbon Footprint',
        content: 'Explore practical ways to adopt a more sustainable lifestyle, from reducing waste and conserving energy to making eco-friendly consumer choices. This module includes a step-by-step guide to conducting a home energy audit and strategies for lowering your personal carbon footprint by 20% in a year.'
    },
    {
        id: 'adult-topic-2',
        title: 'The Economics of Climate Change & Green Investments',
        content: 'Understand the economic impacts of climate change and discover the growing field of green finance, ESG (Environmental, Social, and Governance) criteria, and sustainable investing. Learn how to analyze green bonds and impact investment funds to align your financial goals with environmental values.'
    },
    {
        id: 'adult-topic-3',
        title: 'Climate Policy, Global Agreements, and Local Action',
        content: 'A deep dive into major international climate agreements like the Paris Accord, and how national and local policies are shaping the future of energy and conservation. This section also provides a framework for how you can effectively engage with local government to advocate for better climate policies in your own community.'
    }
];

const seniorMaterials = [
    {
        id: 'senior-topic-1',
        title: 'Gardening for Biodiversity & Local Ecosystems',
        content: 'Learn how to create a garden that supports local wildlife, from planting native species to creating habitats for pollinators and birds. This guide includes blueprints for small-space container gardens and information on how to participate in citizen science projects like bird counts from your own backyard.'
    },
    {
        id: 'senior-topic-2',
        title: 'Environmental Stewardship & Legacy: A Generational Perspective',
        content: 'Explore the concept of environmental stewardship and how you can pass on a legacy of conservation to future generations through mentorship, storytelling, and community involvement. This module includes resources for setting up a small community garden or a local conservation club.'
    },
    {
        id: 'senior-topic-3',
        title: 'The Health Benefits of Nature & Low-Impact Eco-Activities',
        content: 'Discover the science-backed positive effects that spending time in nature has on physical and mental well-being. This section covers the principles of eco-therapy and provides a guide to low-impact activities such as bird watching, nature photography, and forest bathing, which are accessible to all fitness levels.'
    }
];


export default function MaterialsPage() {
  return (
      <div className="container mx-auto p-4 md:p-8">
        <Card className="mb-8 bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Educational Materials</CardTitle>
            <CardDescription className="text-muted-foreground">Select a category to view the available materials.</CardDescription>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="child" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-lg mb-4">
                <TabsTrigger value="child">Child (Classes 1-10)</TabsTrigger>
                <TabsTrigger value="adult">Adult</TabsTrigger>
                <TabsTrigger value="more-than-45">More than 45</TabsTrigger>
            </TabsList>
            <TabsContent value="child">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {childMaterials.map((material) => (
                    <AccordionItem key={material.id} value={material.id} className="bg-white/30 backdrop-blur-lg border-white/20 rounded-lg shadow-md">
                      <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline text-left">
                        {material.title}
                      </AccordionTrigger>
                      <AccordionContent className="p-6 pt-0 text-muted-foreground">
                        <p>{material.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </TabsContent>
            <TabsContent value="adult">
                 <Accordion type="single" collapsible className="w-full space-y-4">
                  {adultMaterials.map((material) => (
                    <AccordionItem key={material.id} value={material.id} className="bg-white/30 backdrop-blur-lg border-white/20 rounded-lg shadow-md">
                      <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline text-left">
                        {material.title}
                      </AccordionTrigger>
                      <AccordionContent className="p-6 pt-0 text-muted-foreground">
                        <p>{material.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </TabsContent>
            <TabsContent value="more-than-45">
                 <Accordion type="single" collapsible className="w-full space-y-4">
                  {seniorMaterials.map((material) => (
                    <AccordionItem key={material.id} value={material.id} className="bg-white/30 backdrop-blur-lg border-white/20 rounded-lg shadow-md">
                      <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline text-left">
                        {material.title}
                      </AccordionTrigger>
                      <AccordionContent className="p-6 pt-0 text-muted-foreground">
                        <p>{material.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </TabsContent>
        </Tabs>
      </div>
  )
}
