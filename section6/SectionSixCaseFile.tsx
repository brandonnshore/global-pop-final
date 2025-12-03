'use client';

import React, { useState } from 'react';

export default function SectionSixCaseFile() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEvidence, setCurrentEvidence] = useState(1);

  const handleOpenFolder = () => {
    setIsOpen(true);
  };

  return (
    <div className="bg-[#e8e0d0] p-8 overflow-y-auto" style={{ minHeight: '600px', maxHeight: '80vh' }}>
      <div className="relative w-full max-w-4xl mx-auto" style={{ marginTop: isOpen ? '0' : '40px' }}>

        {/* CLOSED FOLDER VIEW */}
        {!isOpen && (
          <div
            className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02] mx-auto relative"
            onClick={handleOpenFolder}
            style={{ maxWidth: '700px' }}
          >
            <img
              src="/section6/police-file.jpg"
              alt="Police Case File"
              className="w-full h-auto"
              style={{
                boxShadow: '8px 8px 0px rgba(0,0,0,0.3)',
                border: '3px solid #000'
              }}
            />

            {/* "Click to Open" indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-600 text-white px-4 py-1.5 border-2 border-black font-bold text-xs animate-pulse">
                CLICK TO OPEN CASE FILE
              </div>
            </div>
          </div>
        )}

        {/* OPEN FOLDER VIEW */}
        {isOpen && (
          <div className="animate-folder-open">
            {/* Folder Top Edge (visible when open) */}
            <div className="w-full h-12 bg-[#8b7355] border-3 border-black border-b-0 relative"
                 style={{ boxShadow: '4px -2px 4px rgba(0,0,0,0.2)' }}>
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white font-bold text-xs tracking-widest">
                CASE FILE #2018-KW-001
              </div>
            </div>

            {/* Folder Interior with Tabs */}
            <div className="bg-[#f5f1e8] border-3 border-black border-t-0 p-8 relative"
                 style={{
                   boxShadow: '6px 6px 0px rgba(0,0,0,0.3)',
                   minHeight: '700px'
                 }}>

              {/* Tab Navigation with Next Button */}
              <div className="flex justify-between items-center mb-6">
                {/* Evidence Tabs */}
                <div className="flex gap-1">
                  {/* Evidence 1 Tab */}
                  <button
                    onClick={() => setCurrentEvidence(1)}
                    className={`px-6 py-3 border-3 border-black font-bold text-sm transition-all ${
                      currentEvidence === 1
                        ? 'bg-white border-b-0 translate-y-[3px] z-10'
                        : 'bg-[#d4d0c8] hover:bg-[#e0dcd0]'
                    }`}
                    style={currentEvidence === 1 ? {} : { boxShadow: 'inset 0px 2px 3px rgba(0,0,0,0.2)' }}
                  >
                    <span className="text-red-600 mr-2">■</span>
                    EVIDENCE 1
                  </button>

                  {/* Evidence 2 Tab */}
                  <button
                    onClick={() => setCurrentEvidence(2)}
                    className={`px-6 py-3 border-3 border-black font-bold text-sm transition-all ${
                      currentEvidence === 2
                        ? 'bg-white border-b-0 translate-y-[3px] z-10'
                        : 'bg-[#d4d0c8] hover:bg-[#e0dcd0]'
                    }`}
                    style={currentEvidence === 2 ? {} : { boxShadow: 'inset 0px 2px 3px rgba(0,0,0,0.2)' }}
                  >
                    <span className="text-red-600 mr-2">■</span>
                    EVIDENCE 2
                  </button>

                  {/* Evidence 3 Tab */}
                  <button
                    onClick={() => setCurrentEvidence(3)}
                    className={`px-6 py-3 border-3 border-black font-bold text-sm transition-all ${
                      currentEvidence === 3
                        ? 'bg-white border-b-0 translate-y-[3px] z-10'
                        : 'bg-[#d4d0c8] hover:bg-[#e0dcd0]'
                    }`}
                    style={currentEvidence === 3 ? {} : { boxShadow: 'inset 0px 2px 3px rgba(0,0,0,0.2)' }}
                  >
                    <span className="text-red-600 mr-2">■</span>
                    EVIDENCE 3
                  </button>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentEvidence(currentEvidence === 3 ? 1 : currentEvidence + 1)}
                  className="px-6 py-3 border-3 border-black font-bold text-sm text-white hover:opacity-90 active:translate-y-[2px] transition-all"
                  style={{ backgroundColor: '#DC2626', boxShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}
                >
                  NEXT →
                </button>
              </div>

              {/* Document Area */}
              <div className="bg-white border-3 border-black p-0 relative overflow-hidden"
                   style={{
                     boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.2)',
                     minHeight: '600px'
                   }}>

                {/* EVIDENCE 1: Police Report */}
                {currentEvidence === 1 && (
                  <div className="px-24 py-12 font-mono text-sm">
                    {/* Red stamp */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 font-bold text-xs tracking-wider transform rotate-12 border-2 border-red-800"
                         style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                      EVIDENCE 1
                    </div>

                    {/* Report Header */}
                    <div className="text-center mb-8 pb-6 border-b-3 border-black">
                      <h2 className="text-2xl font-bold mb-1">NAIROBI METROPOLITAN POLICE DEPARTMENT</h2>
                      <p className="text-base font-bold">INCIDENT REPORT</p>
                    </div>

                    {/* Report Fields */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="font-bold mb-1">Incident Type:</p>
                          <p className="pl-4 border-b border-black pb-1">Intellectual Property Complaint</p>
                        </div>
                        <div>
                          <p className="font-bold mb-1">Date Filed:</p>
                          <p className="pl-4 border-b border-black pb-1">14 August 2018</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-1">Complainants:</p>
                        <div className="pl-4">
                          <p className="border-b border-black pb-1">Ayub Ogada (birth name: Job Seda)</p>
                          <p className="border-b border-black pb-1 mt-1">James Mbarack Achieng</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-1">Alleged Offense:</p>
                        <p className="pl-4 border-b border-black pb-1">Unauthorised use of musical composition and sound recording</p>
                      </div>

                      <div>
                        <p className="font-bold mb-2">Summary of Statement:</p>
                        <div className="pl-4 space-y-3 leading-relaxed">
                          <p>
                            The complainants report that a song they composed and recorded in Nairobi in the mid 1970s,
                            titled "Kothbiro," appears to have been used in a recent international release by American
                            recording artist Kanye West, on a track known as "Yikes." The complainants state that they
                            were not contacted prior to the release, did not grant permission for use, and did not receive
                            contracts or licensing documentation regarding the recording.
                          </p>
                          <p>
                            The complainants report that portions of the melody and vocal performance in "Kothbiro" can
                            be clearly heard in the beginning and chorus sections of "Yikes," and that online listeners
                            have noted similarities and identified the Kenyan song as a likely source. The complainants
                            express concern that their work has been used in a high profile commercial project without
                            acknowledgement, credit, or compensation.
                          </p>
                          <p>
                            The complainants request that this matter be documented as a formal record of concern and ask
                            for guidance on possible legal recourse regarding the alleged misuse of their intellectual
                            property in an international context.
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold mb-2">Status:</p>
                        <p className="pl-4 leading-relaxed">
                          This report is logged for record keeping only. Further investigation and legal action would
                          require consultation with intellectual property counsel and may involve cross border jurisdiction.
                        </p>
                      </div>

                      {/* Signature Lines */}
                      <div className="mt-12 pt-8 border-t-2 border-black">
                        <div className="grid grid-cols-2 gap-12">
                          <div>
                            <div className="border-b-2 border-black mb-1 h-8"></div>
                            <p className="text-xs">Reporting Officer</p>
                          </div>
                          <div>
                            <div className="border-b-2 border-black mb-1 h-8"></div>
                            <p className="text-xs">Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* EVIDENCE 2: Video */}
                {currentEvidence === 2 && (
                  <div className="p-12">
                    {/* Red stamp */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 font-bold text-xs tracking-wider transform -rotate-6 border-2 border-red-800"
                         style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                      EVIDENCE 2
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-center">VIDEO EVIDENCE</h2>
                    <p className="text-center text-sm mb-8 font-bold">
                      AUDIO-VISUAL ANALYSIS: KOTHBIRO → YIKES TRANSFORMATION
                    </p>

                    <div className="bg-black border-3 border-black p-2"
                         style={{ boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.5)' }}>
                      <video
                        controls
                        className="w-full"
                        style={{ maxHeight: '500px' }}
                      >
                        <source src="/section6/kothbiro_yikes_sample.mp4" type="video/mp4" />
                        Your browser does not support the video element.
                      </video>
                    </div>

                    <div className="mt-6 bg-yellow-50 border-3 border-black p-4">
                      <p className="font-mono text-xs leading-relaxed">
                        <span className="font-bold">TECHNICAL NOTE:</span> This video demonstrates the sonic transformation
                        from the original "Kothbiro" recording to its use in "Yikes." Note the isolation, pitch-shifting,
                        and looping of specific melodic and vocal elements from the source material.
                      </p>
                    </div>
                  </div>
                )}

                {/* EVIDENCE 3: Analysis Report */}
                {currentEvidence === 3 && (
                  <div className="px-24 py-12 font-mono text-sm">
                    {/* Red stamp */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 font-bold text-xs tracking-wider transform rotate-6 border-2 border-red-800"
                         style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                      EVIDENCE 3
                    </div>

                    {/* Report Header */}
                    <div className="text-center mb-8 pb-6 border-b-3 border-black">
                      <h2 className="text-2xl font-bold mb-1">INVESTIGATIVE ANALYSIS</h2>
                      <p className="text-base font-bold">CASE INTERPRETATION & SCHOLARLY CONTEXT</p>
                    </div>

                    {/* Analysis Text */}
                    <div className="space-y-4 leading-relaxed max-h-[500px] overflow-y-auto pr-4">
                      <p>
                        The case of Kothbiro and Yikes provides one of the clearest examples in this project of the
                        negative side of how global sampling operates at the intersection of creativity and unequal power.
                        In an article by Kam Tambini for OkayAfrica, he shows that Kenyan musician Ayub Ogada stated he
                        was "clueless on his contribution" (Okay Africa) to Kanye West's track, meaning he was given no
                        warning and had no prior knowledge that his composition and recording were being used on a major
                        album entitled "ye". The article explains that both Ogada and co writer James Mbarack Achieng only
                        became aware of the connection after listeners online pointed out the similarity and traced the
                        source back to their 1970s recording.
                      </p>

                      <p>
                        From a sonic perspective, the transformation is undeniable (as seen in evidence 2). In Kothbiro,
                        the melody and vocals function as part of a local musical environment, tied to Kenyan language,
                        landscape, and ritual. In Yikes, that same melodic material is chopped, looped, and placed inside
                        a darker, more anxious context. This is different from the more generic sample people often think
                        of when they hear the term. As opposed to ripping a direct snippet of the song, it is recontextualized.
                        Chopped up, and mashed around to create what some might argue is an entirely new beat. This matches
                        the type of sample based transformation described by Mike Exarchos in folder 2, who emphasize how
                        hip hop producers reconstruct existing recordings into new patterns.
                      </p>

                      <p>
                        However, the acceptance of this sample changes based upon the power dynamics. Annemette Kirkegaard
                        defines cultural appropriation as "a process that often occurs when a dominant culture adopts creative
                        elements from another culture and benefits from them without recognition or meaningful reciprocity."
                        (Kirkegaard 4) She notes that the problem is not cultural exchange itself, but the way in which that
                        exchange occurs. Factors like the imbalance in visibility, capital, and institutional support turns
                        borrowing into exploitation. In this case, Kanye operates from the center of the global music industry,
                        with access to major labels, legal teams, and international distribution. Black Savage (Ogada and
                        Achieng's band), in contrast, stand on the outsides of that system, with a recording that was recorded
                        with deep personal meaning and never any intention for global circulation.
                      </p>

                      <p>
                        In Steven Feld's A Sweet Lullabye For World Music, he discusses how recordings from marginalized
                        communities often become used in what he calls a marketplace of "faraway cheap inspiration," (Feld 167)
                        where sound is detached from its source and repackaged for Western consumers. This story between Black
                        Savage and Kanye mirrors the story he tells of "Rorogwela" and "Sweet Lullaby." In both situations, a
                        local recording is lifted out of its cultural context and brought into a new commercial environment.
                        The original singers and communities remain structurally distant from the profits and visibility that result.
                      </p>

                      <p>
                        When viewed as a whole, the sample itself may be musically effective, and have had no negative intentions
                        behind its use, but the result of its unsolicited use is an asymmetrical exchange, where the emotional
                        and cultural labor embedded in Kothbiro is converted into commercialism on Yikes without giving Ogada
                        and Achieng meaningful control over how their sound is used.
                      </p>

                      {/* Case conclusion */}
                      <div className="mt-8 pt-6 border-t-3 border-black bg-red-50 -mx-4 px-4 py-4">
                        <p className="font-bold text-center text-base">
                          CASE STATUS: DOCUMENTED FOR ACADEMIC RECORD
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes folder-open {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(-15deg);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(0deg);
          }
        }

        .animate-folder-open {
          animation: folder-open 0.6s ease-out;
        }

        /* Custom scrollbar for evidence 3 */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #e0e0e0;
          border-left: 2px solid #000;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border: 1px solid #000;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}