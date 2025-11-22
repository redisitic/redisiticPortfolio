import React, { useState } from 'react';
import LetterGlitch from "../components/LetterGlitch";
import TextPressure from "../components/TextPressure";
import GlassSurface from "../components/GlassSurface";
import FallingText from "../components/FallingText";
import ScrollFloat from "../components/ScrollFloat";
import GradualBlur from "../components/GradualBlur";
import { Home, User, Briefcase, Folder, Sparkles } from 'lucide-react';

const DockIcon = ({ icon: Icon, label, href = '#' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="relative flex items-center justify-center transition-all duration-300 ease-out text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isHovered ? '140px' : '50px',
        height: '40px',
      }}
    >
      <Icon
        className="absolute transition-all duration-300 ease-out"
        size={24}
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? 'translateX(-20px) scale(0.8)' : 'translateX(0) scale(1)',
        }}
      />
      <span
        className="absolute whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
        }}
      >
        {label}
      </span>
    </a>
  );
};

function Landing() {
  const navItems = [
    { icon: Home, label: 'Main', href: '#main' },
    { icon: User, label: 'Who am I', href: '#about' },
    { icon: Briefcase, label: 'Experience', href: '#experience' },
    { icon: Folder, label: 'Projects', href: '#projects' },
    { icon: Sparkles, label: 'Creative Stuff', href: '#creative' },
  ];

  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 w-full h-full z-0">
          <LetterGlitch
            className="w-full h-full"
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={true}
            smooth={true}
          >
            <div className="w-full h-full" />
          </LetterGlitch>
        </div>
        
        {/* Gradual Blur Transition */}
        <GradualBlur
          position="bottom"
          height="15rem"
          strength={0.4}
          divCount={8}
          curve="bezier"
          exponential={true}
          opacity={1}
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.9) 100%) z-[-40]'
          }}
        />
        
        <div className="relative z-50 flex items-center justify-center min-h-screen pointer-events-none top-[-6rem]">
          <div className="pointer-events-auto">
            <TextPressure
              className="w-full max-w-4xl"
              text="Isn't this so cool?!"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#ffffff"
              strokeColor="#ffffff"
              minFontSize={100}
            />
          </div>
        </div>
      </div>

      {/* Navigation Dock - Outside the relative container */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-auto">
        <GlassSurface
          height={60}
          borderRadius={24}
          brightness={20}
          opacity={0.9}
          blur={100}
          backgroundOpacity={0.7}
          saturation={1.5}
          redOffset={-3}
          greenOffset={0}
          blueOffset={3}
          style={{ width: 'auto', minWidth: '400px' }}
        >
          <div className="flex items-center justify-center h-full gap-2 px-4">
            {navItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <DockIcon icon={item.icon} label={item.label} href={item.href} />
                {index < navItems.length - 1 && (
                  <div className="w-px h-8 bg-white/20" />
                )}
              </React.Fragment>
            ))}
          </div>
        </GlassSurface>
      </div>

      <div className="relative min-h-screen bg-gradient-to-b from-transparent to-black/50 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <ScrollFloat
              animationDuration={2}
              ease='back.inOut(2)'
              scrollStart='center bottom+=50%'
              scrollEnd='bottom bottom-=70%'
              stagger={0.1}
            >
              Who Am I?
            </ScrollFloat>
            <div className="w-full h-[500px] relative">
              <FallingText
                text="I'm a passionate developer who loves creating interactive, visually engaging, and secure digital experiences. I merge creativity with strong technical skills to build applications that feel intuitive, look polished, and perform reliably under real-world conditions. With experience across full-stack development, UI/UX, and practical security engineering, I enjoy turning ideas into smooth, modern products that not only work flawlessly but also stand out through thoughtful design and robust architecture."
                highlightWords={[]}
                trigger="click"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="1.5rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
          </div>

          <div className="relative flex items-center justify-center h-full min-h-[500px]">
            <p className="text-2xl text-white/60 text-center italic animate-fade-in">
              Bored? Try clicking on the text ←
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-out 1s forwards;
          opacity: 0;
        }
        
        .highlighted {
          color: #60a5fa;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default Landing;