import { assetBaseUrl, ExternalLink } from "../shared";
import type { CubeFaceData, Project } from "./types";

const a = (path: string) =>
  assetBaseUrl ? `${assetBaseUrl}${path}` : `/${path}`;

export const PROJECTS: Project[] = [
  {
    id: "a4recipe",
    cubeIndex: 0,
    faceIndex: 0,
    thumbnail: a("a4recipe.webp"),
    title: "a4recipe",
    subtitle: "A visual recipe maker",
    liveUrl: "https://yafimski.github.io/a4recipe/",
    description: (
      <>
        My amazing wife works as a pastry chef in a great place in Tel Aviv.
        From time to time she tells me about a funny story where &quot;someone&quot;
        at work would put 1kg of sugar in the recipe instead of 100g.
        <br />
        <br />
        <span className="text-xs">
          <p className="me">
            Me: &quot;How is it possible to miss by x10..? Don&apos;t you do it
            every day..?&quot;
          </p>
          <p className="her">
            Her: &quot;Yeah but we make a lot of things and it&apos;s rare, but
            it happens..&quot;
          </p>
          <p className="me">
            Me: &quot;Ok but I mean.. it&apos;s not obvious when the recipe is
            wrong..?&quot;
          </p>
          <p className="her">
            Her: &quot;It should be.. we write it all down in tables..&quot;{" "}
          </p>
          <p className="me">Me: &quot;Then where do the mistakes come from?&quot;</p>
          <p className="her">
            Her: &quot;Well, the tables are excel and they are packed with
            information so there is a risk of reading the wrong line...&quot;
          </p>
        </span>
        <br /> So I thought.. well, how can I make sure that every time you get
        the right amounts? This quickly became a 3-week experiment with{" "}
        <ExternalLink
          href="https://platform.openai.com/docs/api-reference/chat"
          className="inline-link"
        >
          ChatGpt-4o
        </ExternalLink>{" "}
        for some amazing mouth-salivating image generation.
      </>
    ),
    media: { type: "gif", src: a("a4recipe.gif") },
  },
  {
    id: "aroundme",
    cubeIndex: 0,
    faceIndex: 1,
    thumbnail: a("aroundme.webp"),
    title: "Around Me",
    subtitle: "AI Travel app on Google Play",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.yafimski.aroundme&hl=en",
    description: (
      <>
        Ready to discover the world in a whole new way?
        <br />
        Meet Around Me – your personal AI audio travel tour guide!
        <br />
        <br />
        The app shows you nearby locations and allows you to listen on on-demand
        generated AI voice tour guide to expand your knowledge as a
        tourist/traveller.
        <br />
        <br />
        The app started out as an idea while travelling on our honeymoon, to
        query nearby places without going to google or wikipedia.
        <br />
        <br />
        This became a 3-month project where I built an end-to-end app, backend
        and frontend with integration of Google Places and OpenAI APIs.
      </>
    ),
    media: {
      type: "video",
      src: a("AroundMe Demo.mp4"),
      aspect: "portrait",
    },
    galleryImages: [
      a("aroundme_1.png"),
      a("aroundme_2.png"),
      a("aroundme_3.png"),
    ],
  },
  {
    id: "romeo",
    cubeIndex: 0,
    faceIndex: 2,
    thumbnail: a("romeo.webp"),
    title: "Romeo",
    subtitle: "An online 3D viewer & editor",
    description: (
      <>
        The concept was to create a platform where Construction & 3D
        professionals could upload an asset and not just view it, but also to
        edit/add meaningful metadata to the 3D scene or the object Mesh itself.
        The original idea was inspired by the{" "}
        <ExternalLink
          href="https://github.com/paireks/dotbim"
          className="inline-link"
        >
          .bim format
        </ExternalLink>
        , which urged a more open approach to metadata in 3D environments.
      </>
    ),
    media: {
      type: "video",
      src: a("MVP for Three.js IFC Viewer.mp4"),
      aspect: "landscape",
    },
  },
  {
    id: "songnation",
    cubeIndex: 0,
    faceIndex: 3,
    thumbnail: a("songnation.webp"),
    title: "Songnation",
    subtitle: "A vote-based 24/7 playlist!",
    description: (
      <>
        SongNation is a music project to allow a fresh kind of collaborative and
        democratic playlist.
        <br />
        <br />
        Vote on which track will be next, live! Just like in an election, each
        user gets a vote to effect the results of the upcoming song.
        <br />
        <br />
        Enjoy!
      </>
    ),
    media: {
      type: "video",
      src: a("SongNation Demo.mp4"),
      aspect: "portrait",
    },
    galleryImages: [a("songnation_cropped.png")],
  },
  {
    id: "canisolar",
    cubeIndex: 1,
    faceIndex: 0,
    title: "Canisolar",
    subtitle: "Calculate your solar panel ROI",
    liveUrl: "https://canisolar.netlify.app/",
    description: (
      <>
        Canisolar is a tool to calculate the ROI of a solar panel system.
        <br />
        <br />
        It allows you to input your energy consumption and solar panel system size, and it will calculate the ROI of the system in a few seconds.
      </>
    ),
    galleryImages: [a("canisolar.png")],
  },
  {
    id: "shouldisignit",
    cubeIndex: 1,
    faceIndex: 1,
    title: "Should I Sign It",
    subtitle: "AI-powered contract signing assistant",
    liveUrl: "https://www.shouldisignit.com/",
    description: (
      <>
        Should I Sign It is an AI-powered contract signing assistant.
        <br />
        <br />
        It allows you to upload a contract in DOCX or PDF form, or just paste the text into the textarea, and it will use AI to analyze the contract and suggest if you should sign it based on the contract terms and conditions, clauses, and will show you what to watch out for, what to look for, and what to ask the other party to clarify.
      </>
    ),
    galleryImages: [a("shouldisignit_screenshot.png")],
  },
  {
    id: "salkal",
    cubeIndex: 1,
    faceIndex: 2,
    title: "Salkal סל קל",
    subtitle: "A price-comparison tool for Israeli groceries",
    liveUrl: "https://salkal.netlify.app/",
    description: (
      <>
        Salkal is a price-comparison tool for Israeli groceries.
        <br />
        <br />
        It allows you to upload a real image of your grocery receipt or plan a list of products you want to buy, and it will compare the prices of the products in the different stores and chains in Israel and show you the best price and the best store to buy them from, specifically tailored to your needs.
      </>
    ),
    galleryImages: [a("salkal_logo.png"), a("salkal_receipt.png")],
  },
  {
    id: "pele",
    cubeIndex: 1,
    faceIndex: 3,
    title: "Pele AI Assistant",
    subtitle: "Your personal AI assistant for Autodesk Revit",
    
    description: (
      <>
        Pele AI Assistant is your personal AI assistant for Autodesk Revit.
        <br />
        <br />
        It allows you to ask questions about your Revit project as a sort of command-line interface (the first and arguable best option for ai-commands in Revit, about 2 years(!) before autodesk themselves made a similar product, and way before anyone else could make a similar product that is publicly available), and it will use AI to answer your questions, and help you with your project.
      </>
    ),
    galleryImages: [a("pele.png")],
  },
  {
    id: "qraze",
    cubeIndex: 1,
    faceIndex: 4,
    title: "QRaze",
    subtitle: "Navigate the Grid. Beat the Clock.",
    liveUrl:"https://www.qraze.online/",
    description: (
      <>
        A free to play browser-based 3D puzzle and platformer game: hop and jump with the ball through 3D grid levels, avoid spikes, collect coins to rank top in the leaderboard, and reach the finish before time runs out.
      </>
    ),
    media: {
      type: "video",
      src: a("QRaze_short_demo.mp4"),
      aspect: "landscape",
    },
  },
  {
    id: "soundaround",
    cubeIndex: 1,
    faceIndex: 5,
    title: "SoundAround",
    subtitle: "Mapping the Sounds of the World",
    liveUrl:"https://soundaroundmap.online/",
    description: (
      <>
        SoundAround is a collaborative map of public Sounds. Upload and Share.
      </>
    ),
  },
];

export const CUBE_COUNT = 2;

export const PLACEHOLDER_FACES: CubeFaceData[] = [
  {
    cubeIndex: 0,
    faceIndex: 4,
    thumbnail: "",
    project: null,
    isPlaceholder: true,
    placeholderLabel: "Supermark-It (soon)",
  },
  {
    cubeIndex: 0,
    faceIndex: 5,
    thumbnail: "",
    project: null,
    isPlaceholder: true,
    placeholderLabel: "Soon",
  },
];

export function getCubeFaces(cubeIndex: number): CubeFaceData[] {
  return [
    ...PROJECTS.filter((project) => project.cubeIndex === cubeIndex).map(
      (project) => ({
        cubeIndex: project.cubeIndex,
        faceIndex: project.faceIndex,
        thumbnail: project.thumbnail ?? "",
        project,
        isPlaceholder: !project.thumbnail,
        placeholderLabel: project.thumbnail ? undefined : project.title,
      }),
    ),
    ...PLACEHOLDER_FACES.filter((face) => face.cubeIndex === cubeIndex),
  ];
}

/** @deprecated Use getCubeFaces(cubeIndex) */
export const CUBE_FACES: CubeFaceData[] = [
  ...PROJECTS.map((project) => ({
    cubeIndex: project.cubeIndex,
    faceIndex: project.faceIndex,
    thumbnail: project.thumbnail ?? "",
    project,
    isPlaceholder: !project.thumbnail,
    placeholderLabel: project.thumbnail ? undefined : project.title,
  })),
  ...PLACEHOLDER_FACES,
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
