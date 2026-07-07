import React from 'react';
import { useAnimus } from '../context/AnimusContext';
import { playClick } from '../utils/audio';

interface AwardData {
  id: string;
  name: string;
  sub: string;
  description: string;
  detail: string;
  classification: string;
  period: string;
  color: string;
}

export const ArtifactsEden: React.FC = () => {
  const { currentSection, relicShattered, setRelicShattered } = useAnimus();

  if (currentSection !== 'artifacts') return null;

  const awards: AwardData[] = [
    {
      id: 'award_1',
      name: 'Class XII Merit',
      sub: 'Rank 3 in School',
      classification: 'ACADEMIC MERIT',
      period: '2025',
      color: '#ffc83b',
      description: 'Awarded for exceptional academic performance and scoring 90.8% in CBSE Board Examination.',
      detail: 'Ranked 3rd school-wide out of graduating seniors.',
    },
    {
      id: 'award_2',
      name: 'VIT Academic Scholarship',
      sub: 'Merit Scholarship Recipient',
      classification: 'SCHOLARSHIP MATRIX',
      period: '2025',
      color: '#3de7ff',
      description: 'Awarded VIT Pune Merit Scholarship for ranking among the top academic tier of computer engineering matriculates.',
      detail: 'Maintained 9.07 SGPA in subsequent semesters.',
    },
    {
      id: 'award_3',
      name: 'Smart India Hackathon',
      sub: 'National Finalist',
      classification: 'PROJECT DEPLOYMENT',
      period: '2023',
      color: '#00ff88',
      description: 'Staged software project prototypes to resolve real-world government problems. Selected as a national finalist.',
      detail: 'Collaborated on distributed web API architectures under the Ministry of Education.',
    },
  ];

  const activeAward = awards.find((a) => a.id === relicShattered);

  const handleSelect = (id: string) => {
    playClick();
    setRelicShattered(relicShattered === id ? null : id);
  };

  const handleBack = () => {
    playClick();
    setRelicShattered(null);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '12%',
        left: 0,
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 8%',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      {/* Top Left Heading */}
      <div 
        className="transparent-text-block interactive"
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          zIndex: 10
        }}
      >
        <span className="hud-font" style={{ color: 'var(--animus-cyan)', fontSize: '1rem', letterSpacing: '0.25em' }}>
          // PERFORMANCE HONORS
        </span>
        <h2 className="serif-font" style={{ fontSize: '2.8rem', color: '#fff', marginTop: '6px' }}>
          AWARDS
        </h2>
      </div>

      {/* LEFT COLUMN: Glimpse List OR Selected Award Details (Swaps in place) */}
      <div 
        className="transparent-text-block interactive"
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.2rem',
          marginTop: '60px',
        }}
      >
        {!activeAward ? (
          /* Glimpse Index */
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              animation: 'glimpseFadeIn 0.3s ease'
            }}
          >
            {awards.map((award) => (
              <div
                key={award.id}
                style={{
                  border: `1px solid ${award.color}33`,
                  background: 'rgba(7, 13, 20, 0.65)',
                  padding: '16px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleSelect(award.id)}
              >
                <div>
                  <div className="hud-font" style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                    {award.name}
                  </div>
                  <div style={{ color: 'rgba(226,244,247,0.5)', fontSize: '0.85rem', marginTop: '4px' }}>
                    {award.sub} // {award.period}
                  </div>
                </div>
                <div className="hud-font" style={{ color: award.color, fontSize: '0.8rem', textShadow: `0 0 4px ${award.color}33` }}>
                  [ VIEW DETAILS ]
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed Panel (Replaces Index on Left, leaving right-side gems fully visible) */
          <div
            style={{
              border: `1px solid ${activeAward.color}`,
              borderLeft: `4px solid ${activeAward.color}`,
              padding: '24px',
              background: 'rgba(7, 13, 20, 0.95)',
              boxShadow: `0 0 30px ${activeAward.color}26`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              animation: 'detailFadeIn 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="hud-font" style={{ color: activeAward.color, fontSize: '0.85rem', letterSpacing: '0.15em' }}>
                // RECORD DATA VERIFIED
              </span>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                }}
                onClick={handleBack}
              >
                ×
              </button>
            </div>

            <div>
              <h3 className="serif-font" style={{ fontSize: '1.8rem', color: '#fff', lineHeight: '1.2' }}>
                {activeAward.name}
              </h3>
              <div className="hud-font" style={{ fontSize: '0.8rem', color: 'rgba(226,244,247,0.5)', marginTop: '4px' }}>
                CLASSIFICATION: {activeAward.classification} // PERIOD: {activeAward.period}
              </div>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.4', color: activeAward.color, fontWeight: 'bold' }}>
              {activeAward.sub}
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.5', color: '#e2f4f7' }}>
              {activeAward.description}
            </p>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: 'rgba(226,244,247,0.7)' }}>
              {activeAward.detail}
            </p>

            <button
              className="hud-font"
              style={{
                alignSelf: 'flex-start',
                background: 'none',
                border: `1px solid ${activeAward.color}`,
                color: activeAward.color,
                padding: '6px 16px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '6px',
              }}
              onClick={handleBack}
            >
              [ BACK TO INDEX ]
            </button>
          </div>
        )}
      </div>

      {/* Right Column Spacer (Left empty in DOM, R3F renders vertical gems stack here) */}
      <div style={{ width: '38%' }} />

      <style>{`
        @keyframes glimpseFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
