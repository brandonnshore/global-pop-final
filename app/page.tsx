"use client";

import { useState, useEffect } from "react";
import MenuBar from "@/components/MenuBar";
import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import BootScreen from "@/components/BootScreen";

export type DesktopItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  x: number;
  y: number;
  content?: React.ReactNode;
};

export default function Home() {
  const [openWindows, setOpenWindows] = useState<DesktopItem[]>([]);
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Set positions based on window size after mount
    setDesktopItems([
      // Source 1 - Burns et al.
      {
        id: "sampling-storytelling",
        name: "Sampling & Storytelling",
        type: "folder",
        x: window.innerWidth - 180,
        y: 50,
        content: (
          <div className="p-6 max-w-3xl">
            <div className="border-b-4 border-black pb-4 mb-4">
              <h1 className="text-3xl font-bold mb-2">SAMPLING & STORYTELLING</h1>
              <p className="text-sm italic">A Music Magazine Feature</p>
            </div>
            <div className="mb-4 p-3 bg-black text-white">
              <p className="font-bold">Burns, Lori, et al. "Sampling and Storytelling: Kanye West's Vocal and Sonic Narratives."</p>
              <p className="text-xs">The Cambridge Companion to the Singer-Songwriter, 2016</p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="font-bold text-lg">THE NARRATIVE PRODUCER</p>
              <p>This paper talks about Kanye West's approach to sampling, and how it transforms him from a typical hip hop producer into more of a singer/songwriter who uses sounds and samples as his form of storytelling. The authors discuss how his production choices create narratives about fame, race, and consumerism on both a personal and political level.</p>

              <div className="border-l-4 border-black pl-4 my-4">
                <p className="italic">"Kanye is an artist who has the ability to merge technology, emotion, and culture through his manipulation of other people's music."</p>
              </div>

              <p className="font-bold">TRACK ANALYSIS</p>
              <p>The authors analyze several tracks, including "Diamonds from Sierra Leone," "Welcome to Heartbreak," and "Black Skinhead," explaining how each uses sampling and vocal manipulation to construct meaning (160–168).</p>

              <p><span className="font-bold">Shirley Bassey's sample</span> in "Diamonds from Sierra Leone" (162) serves as a commentary on the global diamond trade and celebrity excess/obsession with diamonds.</p>

              <p><span className="font-bold">"Black Skinhead"</span> (168) samples industrial rock elements to challenge racial stereotypes.</p>

              <div className="bg-gray-200 p-3 mt-4">
                <p className="font-bold text-xs">PROJECT CONNECTION</p>
                <p className="text-xs">I plan to use this reading to explore how Kanye uses global music samples as a form of individual creation. It supports my discussion on how sampling can both empower and exploit depending on how it is framed. This will help me discuss whether Kanye's production style is positive or negative for the "global music world."</p>
              </div>
            </div>
          </div>
        ),
      },
      // Source 2 - Exarchos
      {
        id: "hip-hop-pedagogy",
        name: "Hip-Hop Pedagogy",
        type: "folder",
        x: window.innerWidth - 180,
        y: 180,
        content: (
          <div className="p-6 max-w-3xl font-mono text-xs">
            <div className="border-2 border-black p-4 mb-4">
              <h1 className="text-xl font-bold mb-2">[TECHNICAL DOCUMENT]</h1>
              <h2 className="text-lg">HIP-HOP PEDAGOGY AS PRODUCTION PRACTICE</h2>
              <p className="mt-2">Author: Michail Exarchos (A.K.A. Stereo Mike)</p>
              <p>Journal of Popular Music Education, Vol. 2, No. 1, 2018</p>
            </div>

            <div className="space-y-3">
              <div className="bg-black text-white p-2">
                <p>&gt; ABSTRACT_</p>
              </div>
              <p>Hip hop sampling analyzed from creative and ethical lens. Producers learn skills: listening, reinterpretation, innovation. Sampling = reverse engineering, not theft.</p>

              <div className="bg-black text-white p-2 mt-4">
                <p>&gt; CORE_ARGUMENT_</p>
              </div>
              <p>Sampling is NOT copying or stealing but rather a reverse engineering that breaks down music to reveal something new about how it was constructed. The act of sampling serves as a learning tool for producers.</p>

              <div className="border-l-2 border-black pl-3 my-3">
                <p className="font-bold">CASE STUDIES:</p>
                <p>- Kanye West: Layered production style</p>
                <p>- J Dilla: Fragment manipulation</p>
                <p>- Digital tools: Synths, keyboards, samplers</p>
              </div>

              <div className="bg-black text-white p-2 mt-4">
                <p>&gt; KEY_FINDINGS (pp. 115-123)_</p>
              </div>
              <p>Producers take fragments of existing songs and turn them into NEW cultural statements that reflect an entirely new personal meaning or commentary on the world.</p>
              <p className="mt-2">Sampling "engages both critical listening and ethical decision making" (121–123).</p>

              <div className="bg-black text-white p-2 mt-4">
                <p>&gt; IMPLICATIONS_</p>
              </div>
              <p>Forces us to rethink what it means to "own" or "originate" music. Culture of remixing promotes musical literacy.</p>

              <div className="border-2 border-black p-3 mt-4">
                <p className="font-bold">// PROJECT_APPLICATION //</p>
                <p className="mt-2">Will use this source to frame Kanye's work as a skill requiring years of practice. Highlights how manipulation of global samples can be understood as creativity, not appropriation. Connects to class ideas about tension between imitation and transformation.</p>
              </div>
            </div>
          </div>
        ),
      },
      // Source 3 - Kirkegaard
      {
        id: "cultural-appropriation",
        name: "Cultural Appropriation",
        type: "folder",
        x: window.innerWidth - 180,
        y: 310,
        content: (
          <div className="p-6 max-w-3xl">
            <div className="text-center mb-6 pb-4 border-b-2 border-black">
              <p className="text-xs mb-2">ROSKILDE UNIVERSITY RESEARCH PORTAL</p>
              <h1 className="text-2xl font-bold">Cultural Appropriation Within Music Culture</h1>
              <p className="text-sm mt-2">Annemette Kirkegaard</p>
              <p className="text-xs">December 17, 2015</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-gray-100 p-4 border-l-4 border-black">
                <p className="font-bold mb-2">THESIS</p>
                <p>Sampling from other cultures' music goes one of two ways: It either promotes cross-cultural understanding, OR it produces inequality. This is dependent on the context and intent of the sample being used.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">The Two Paths</h3>
                <p>Appropriation becomes problematic when large power imbalances exist. Example: A large American artist profiting off marginalized culture without acknowledgment or compensation.</p>
              </div>

              <div className="border-2 border-black p-3">
                <p className="font-bold">WHAT ARTISTS MUST DO:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Give proper credit</li>
                  <li>Actually collaborate with original artists</li>
                  <li>Give back to communities music came from</li>
                  <li>Develop awareness of music origins</li>
                </ul>
                <p className="mt-2 italic text-xs">Note: Simply using and promoting is not enough.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Case Studies (pp. 4-10)</h3>
                <p className="mb-2"><span className="font-bold">Exploitation:</span> Western musicians using non-Western sounds and traditions. Indigenous or African diaspora music commercialized by pop artists without credit.</p>
                <p><span className="font-bold">Empowerment:</span> True collaborations between large artists and local musicians, leaving local musicians empowered.</p>
              </div>

              <div className="bg-black text-white p-3">
                <p className="font-bold text-xs mb-1">THEORETICAL FRAMEWORK</p>
                <p className="text-xs">Cites Bell Hooks and Stuart Hall on power and representation in cultural appropriation. Shows how easily cultural exchange can turn into exploitation, depending on who's in control.</p>
              </div>

              <div className="mt-6 p-4 bg-gray-200">
                <p className="font-bold text-xs mb-2">→ PROJECT USE</p>
                <p className="text-xs">Serves as ethical and theoretical foundation. Questions whether Kanye's global sampling empowers artists he borrows from or reinforces Western dominance. Works with power relations behind sampling. Connects to Feld's concepts—Kanye's sampling only positive when he acknowledges and benefits original sources.</p>
              </div>
            </div>
          </div>
        ),
      },
      // Source 4 - King
      {
        id: "legal-blues",
        name: "Legal Blues",
        type: "folder",
        x: window.innerWidth - 330,
        y: 50,
        content: (
          <div className="p-6 max-w-3xl">
            <div className="bg-black text-white p-4 mb-4">
              <h1 className="text-2xl font-bold">⚖️ KANYE'S LEGAL BLUES</h1>
              <p className="text-sm mt-1">14 Lawsuits and Counting...</p>
            </div>

            <div className="border-4 border-black p-4 mb-4">
              <p className="font-bold text-lg">BREAKING:</p>
              <p className="text-xl mt-2">Kanye West Sued at Least 14 Times for Using Samples Without Permission</p>
              <p className="text-xs mt-2">By Ashley King | Digital Music News | March 27, 2025</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-red-100 border-2 border-black p-3">
                <p className="font-bold">🚨 THE VERDICT:</p>
                <p className="mt-1">Kanye West is a "REPEAT OFFENDER" who often borrows other artists' work without any form of legal clearance.</p>
              </div>

              <div>
                <p className="font-bold text-lg">THE PATTERN</p>
                <p className="mt-2">Mindset: <span className="italic">"Sample first, ask later"</span></p>
                <p className="mt-2">Result: 14 different legal disputes throughout his career from artists in the US and abroad.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="border border-black p-2">
                  <p className="font-bold">LAWSUIT #1</p>
                  <p>Artist: [Details in article]</p>
                </div>
                <div className="border border-black p-2">
                  <p className="font-bold">LAWSUIT #2</p>
                  <p>Artist: [Details in article]</p>
                </div>
                <div className="border border-black p-2">
                  <p className="font-bold">LAWSUIT #3</p>
                  <p>Artist: [Details in article]</p>
                </div>
                <div className="border border-black p-2">
                  <p className="font-bold">...#14</p>
                  <p>And more coming</p>
                </div>
              </div>

              <div className="bg-yellow-100 border-2 border-black p-3">
                <p className="font-bold">⚠️ CREDIBILITY NOTE</p>
                <p className="text-xs mt-1">More like a news report than academic source, but provides factual information with specific names, dates, and outcomes.</p>
              </div>

              <div className="border-t-4 border-black pt-4 mt-4">
                <p className="font-bold">MY TAKE FOR THE PROJECT:</p>
                <p className="mt-2 text-xs">This source argues AGAINST Kanye. Shows him as an entitled artist who continuously goes beyond pushing the limits of ownership and ethics.</p>
                <p className="mt-2 text-xs">Kanye often plays the role of the oppressed to his fans. But this is an example of him as the OPPRESSOR. No different than the narrative of Western power over small artists.</p>
                <p className="mt-2 text-xs font-bold">Connection: Feld's discussion of cultural appropriation. Kanye takes other cultures' music without permission and provides no genuine cultural respect in return.</p>
              </div>
            </div>
          </div>
        ),
      },
      // Source 5 - Tambini
      {
        id: "kothbiro-sample",
        name: "Kothbiro Sample",
        type: "folder",
        x: window.innerWidth - 330,
        y: 180,
        content: (
          <div className="p-6 max-w-3xl bg-gradient-to-b from-purple-50 to-white">
            <div className="mb-6">
              <div className="inline-block bg-purple-600 text-white px-4 py-2 text-xs font-bold">
                OKAYAFRICA MUSIC BLOG
              </div>
              <h1 className="text-3xl font-bold mt-4">Kanye West Sampled This 1970s Kenyan Record on Ye</h1>
              <p className="text-sm text-gray-600 mt-2">By Kam Tambini | June 4, 2018</p>
            </div>

            <div className="bg-white border-2 border-purple-600 p-4 mb-4">
              <p className="font-bold text-lg">🎵 THE SAMPLE</p>
              <p className="mt-2"><span className="font-bold">Original:</span> "Kothbiro" by Black Savage (1976, Kenya)</p>
              <p><span className="font-bold">Sampled in:</span> "Yikes" from album "Ye" (2018)</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <p className="font-bold text-red-800">⚠️ THE PROBLEM</p>
                <p className="mt-2">The original artists in Black Savage had NO IDEA this song was coming out. The sample was used completely without their knowledge.</p>
              </div>

              <div>
                <p className="font-bold text-lg mb-2">What Happened</p>
                <p>This is a perfect example of how older (often African) records are pulled into Western pop without any compensation.</p>
              </div>

              <div className="bg-gray-100 p-4">
                <p className="font-bold">EVIDENCE</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Article provides audio of both original and sampled versions</li>
                  <li>Includes timestamps showing the sample</li>
                  <li>Quotes Ayub Ogada: said he was "clueless" about his contribution</li>
                  <li>References Afro 7 Records Archives (reissued Black Savage compilation)</li>
                </ul>
              </div>

              <div className="bg-purple-100 border-2 border-purple-600 p-4">
                <p className="font-bold">💭 THE DEEPER ISSUE</p>
                <p className="mt-2 italic">Even when African music is sampled in what the public views as a "positive way" (great, popular song), the original sample was still stripped of context and lost its original ownership.</p>
              </div>

              <div className="border-t-2 border-purple-600 pt-4 mt-6">
                <p className="text-xs font-bold mb-2">→ HOW I'LL USE THIS</p>
                <p className="text-xs">Compare to Feld's work on how Western artists repurpose non-Western music, erasing the original creator. Shows how Kanye's global sampling blurs lines between celebration and exploitation.</p>
                <p className="text-xs mt-2">Connects to overall argument: Even "good" sampling can be problematic when it strips artists of ownership.</p>
              </div>
            </div>
          </div>
        ),
      },
      // Source 6 - Feld
      {
        id: "sweet-lullaby",
        name: "Sweet Lullaby",
        type: "folder",
        x: window.innerWidth - 330,
        y: 310,
        content: (
          <div className="p-6 max-w-3xl font-serif">
            <div className="border-4 border-double border-black p-6 mb-6">
              <h1 className="text-3xl font-bold text-center mb-2">A Sweet Lullaby for World Music</h1>
              <p className="text-center text-sm">Steven Feld</p>
              <p className="text-center text-xs italic mt-1">Globalization, December 31, 2020, pp. 189–216</p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div className="italic text-center py-4 border-y-2 border-black">
                <p>"The duality of celebration and exploitation in world music"</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Central Argument</h3>
                <p>World music has a duality: it both celebrates cultural fusion and diversity, yet often reveals inequality where Western artists profit from music of marginalized communities.</p>
              </div>

              <div className="bg-gray-50 p-4 border border-black">
                <p className="font-bold mb-2">Primary Case Study</p>
                <p><span className="italic">Deep Forest's "Sweet Lullaby"</span> sampled a lullaby from the Solomon Islands without proper credit.</p>
                <p className="mt-2 text-xs">Supported with evidence from UNESCO and ethnomusicology research.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">The Balance</h3>
                <p>Feld discusses the tension between:</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border-2 border-black p-3">
                    <p className="font-bold text-center">CELEBRATION</p>
                    <p className="text-xs mt-2 text-center">Honoring past music, promoting cultural exchange</p>
                  </div>
                  <div className="border-2 border-black p-3 bg-black text-white">
                    <p className="font-bold text-center">EXPLOITATION</p>
                    <p className="text-xs mt-2 text-center">Profiting without credit, power imbalances</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-600 p-4">
                <p className="font-bold text-yellow-800">⭐ WHY THIS IS MY MOST IMPORTANT SOURCE</p>
                <p className="mt-2 text-xs">Obviously we discussed this in class, making it trustworthy. I plan to use Feld's framework as the BACKBONE for my discussion.</p>
              </div>

              <div className="border-t-4 border-black pt-4 mt-6">
                <p className="font-bold text-lg mb-3">Project Application</p>
                <div className="space-y-2 text-xs">
                  <p><span className="font-bold">Connection to "Legal Blues":</span> Expresses the anxious narrative Feld talks about. Kanye's continuous lawsuits show the bad side of sampling.</p>
                  <p><span className="font-bold">Connection to "Hip-Hop Pedagogy":</span> Discusses the positive side—sampling as beneficial for producers and the world.</p>
                  <p className="mt-4 italic bg-black text-white p-2">Overall argument: Kanye stands at the crossroads between celebrating creativity and producing the same exploitative issues we've seen for decades.</p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      // System items
      {
        id: "trash",
        name: "Trash",
        type: "folder",
        x: 20,
        y: window.innerHeight - 150,
        content: <div className="p-4">Trash is empty.</div>,
      },
      {
        id: "readme",
        name: "Read Me",
        type: "file",
        x: 20,
        y: 50,
        content: (
          <div className="p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">📚 Welcome to Kanye 2049</h2>
            <p className="mb-4">An interactive exploration of Kanye West's global sampling practices.</p>
            <div className="bg-gray-100 p-4 border-2 border-black">
              <p className="font-bold mb-2">Navigation Guide:</p>
              <p className="text-sm">Each folder on the right contains a source from my annotated bibliography. Double-click to explore different perspectives on sampling, cultural appropriation, and Kanye's place in global music culture.</p>
            </div>
            <p className="mt-4 text-xs italic">Note: This is temporary content. The full paper will be integrated soon.</p>
          </div>
        ),
      },
    ]);
  }, []);

  const handleOpenItem = (item: DesktopItem) => {
    if (!openWindows.find((w) => w.id === item.id)) {
      setOpenWindows([...openWindows, item]);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
  };

  const handleIconPositionChange = (id: string, x: number, y: number) => {
    setDesktopItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <MenuBar />
      <Desktop
        items={desktopItems}
        onOpenItem={handleOpenItem}
        onIconPositionChange={handleIconPositionChange}
      />

      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          title={window.name}
          onClose={() => handleCloseWindow(window.id)}
          initialX={100 + index * 30}
          initialY={100 + index * 30}
        >
          {window.content}
        </Window>
      ))}
    </div>
  );
}
