import Link from "next/link";

export const metadata = {
  title: "Music Practice Tools | Gandharva School Of Music",
  description:
    "Free online practice tools for musicians: interactive metronome, guitar tuner & chord finder, virtual piano keyboard, and drum rhythm trainer.",
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: "Interactive Metronome",
      slug: "metronome",
      badge: "Essential",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description:
        "High-precision web audio metronome with customizable BPM (40-240), tap tempo, accent beats, and time signature options (2/4, 3/4, 4/4, 6/8).",
      features: ["Precision Web Audio synthesis", "Tap Tempo detection", "Accent on downbeat", "Subdivision practice"],
    },
    {
      title: "Guitar Tuner & Chord Finder",
      slug: "guitar",
      badge: "Popular",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      description:
        "Accurate standard guitar pitch generator (E-A-D-G-B-E) and comprehensive interactive visual chord diagram explorer.",
      features: ["Standard 6-string reference notes", "Interactive string audio", "Fretboard chord library", "Finger placement guide"],
    },
    {
      title: "Virtual Piano & Chord Visualizer",
      slug: "piano-tools",
      badge: "Interactive",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      description:
        "Full interactive 2-octave digital piano with polyphonic Web Audio playback, major/minor chord highlights, and key labeling.",
      features: ["Low-latency Web Audio API", "Interactive mouse & keyboard touch", "Major/Minor chords highlight", "Octave shifting"],
    },
    {
      title: "Virtual Drum Machine & Beats",
      slug: "drums",
      badge: "Rhythm",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      ),
      description:
        "Practice rhythm with kick, snare, hi-hat, tom, and cymbal pads. Ideal for locking your timing in rock, pop, and blues rhythms.",
      features: ["Synthesized drum sounds", "Responsive touch pads", "Keyboard shortcuts", "Loop rhythm accompaniments"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="bg-[#24105E] pt-24 md:pt-32 pb-16 md:pb-24 px-4 text-center text-white relative">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FF7703] text-white mb-4">
            Free Musician Utilities
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-vidaloka), serif" }}
          >
            Digital Practice Tools for Musicians
          </h1>
          <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Free browser-based practice companions built with the Web Audio API. Perfect your timing, pitch, chords, and rhythmic precision.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-20 px-4 bg-gray-50/60 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#9506EE] flex items-center justify-center group-hover:bg-[#9506EE] group-hover:text-white transition-colors duration-300">
                      {tool.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#FF7703]">
                      {tool.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#24105E] mb-3 group-hover:text-[#9506EE] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    {tool.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="w-full py-3.5 bg-[#9506EE] hover:bg-[#8200DA] text-white text-center font-semibold rounded-xl transition-all shadow-md shadow-purple-600/20 text-sm flex items-center justify-center gap-2"
                >
                  Launch {tool.title}
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
