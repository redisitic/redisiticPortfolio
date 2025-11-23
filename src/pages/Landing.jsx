import React, { useState } from 'react';
import PixelBlast from '../components/PixelBlast';
import LetterGlitch from "../components/LetterGlitch";
import TextPressure from "../components/TextPressure";
import GlassSurface from "../components/GlassSurface";
import FallingText from "../components/FallingText";
import ScrollFloat from "../components/ScrollFloat";
import GradualBlur from "../components/GradualBlur";
import CustomScrollStack, { CustomScrollStackItem } from '../components/CustomScrollStack';
import { Home, User, Briefcase, Folder, Sparkles, Instagram, Youtube, Linkedin, FileText } from 'lucide-react';

const DockIcon = ({ icon: Icon, label, href = '#' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
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
  const [showResume, setShowResume] = useState(false);
  const [resumeAnimating, setResumeAnimating] = useState(false);
  const [resumeClosing, setResumeClosing] = useState(false);
  const [experienceSticky, setExperienceSticky] = useState(false);
  const [stackComplete, setStackComplete] = useState(false);

  const navItems = [
    { icon: Home, label: 'Main', href: '#main' },
    { icon: User, label: 'Who am I', href: '#about' },
    { icon: Briefcase, label: 'Experience', href: '#experience' },
    { icon: Folder, label: 'Projects', href: '#projects' },
    { icon: Sparkles, label: 'Creative Stuff', href: '#creative' },
  ];

  const handleResumeClick = () => {
    setResumeAnimating(true);
    setTimeout(() => {
      setShowResume(true);
      setResumeAnimating(false);
    }, 400);
  };

  const handleCloseResume = () => {
    setResumeClosing(true);
    setTimeout(() => {
      setShowResume(false);
      setResumeClosing(false);
    }, 400);
  };

  // Track when experience section becomes sticky and when stack ends
  React.useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById('experience-sticky');
      
      if (!experienceSection) return;

      const experienceRect = experienceSection.getBoundingClientRect();
      
      // Check if the element is stuck at the top
      const isStuck = experienceRect.top <= 0;
      
      setExperienceSticky(isStuck && !stackComplete);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stackComplete]);

  return (
    <>
      {/* Galaxy Background - Behind Everything */}
      <div className="fixed inset-0 w-full h-full z-0">
        <PixelBlast
        variant="circle"
        pixelSize={6}
        color="#54b893"
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        speed={1}
        edgeFade={0.1}
        transparent
        />
      </div>

      <div className="relative min-h-screen">
        <div id="main" className="absolute inset-0 w-full h-full z-0">
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
        <GradualBlur
          position="top"
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
      <div className='w-full h-[2vh] -top-[1vh] backdrop-blur-[6.4px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[6.4px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[5.68px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[4.144px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[2.656px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[1.6px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[0.96px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[0.624px] opacity-100'></div>
      <div className='w-full h-[2vh] backdrop-blur-[0.0448px] opacity-100'></div>
      <div className="relative min-h-screen ">
        <div className="max-w-7xl mx-auto">
          <div id="about" className="relative mb-4">
            <ScrollFloat
              animationDuration={2}
              ease='back.inOut(2)'
              scrollStart='center bottom+=50%'
              scrollEnd='bottom bottom-=70%'
              stagger={0.1}
            >
              Who Am I?
            </ScrollFloat>
          </div>

          {/* Full width FallingText on top */}
          <div className="w-full h-[250px] relative mb-4 overflow-hidden">
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

          {/* Two half-width FallingText in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-0">
            <div className="w-full h-[200px] relative overflow-hidden">
              <FallingText
                text="Beyond development, I also love expressing ideas visually through Blender. I enjoy crafting 3D environments, stylized animations, and cinematic scenes that add depth and personality to the projects I build. Working in 3D pushes my creativity, sharpens my attention to detail, and complements my front-end work by helping me think more visually and spatially when designing interfaces and interactions."
                highlightWords={[]}
                trigger="click"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="1.3rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
            <div className="w-full h-[200px] relative overflow-hidden">
              <FallingText
                text="On the engineering side, I've built multiple MERN applications ranging from secure authentication systems to full-stack platforms designed to demonstrate OWASP top vulnerabilities and safe-by-design implementations. Combined with my hands-on VAPT experience—breaking, testing, and hardening applications—I've developed a strong security mindset that guides how I architect every feature. I enjoy analyzing systems from an attacker's perspective and then translating those insights into clean, resilient, and user-friendly solutions."
                highlightWords={[]}
                trigger="click"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="1.3rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
          </div>

          {/* Bored text centered below with social links */}
          <div className="relative flex items-center justify-center min-h-[200px] gap-8">
            {/* Left side - Instagram & YouTube */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/redisitic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <Instagram size={32} />
              </a>
              <a 
                href="https://www.youtube.com/@redisitic6846" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <Youtube size={32} />
              </a>
            </div>

            {/* Center - Bored text */}
            <p 
              className="text-2xl text-white/60 text-center italic opacity-0"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                          el.classList.add('animate-fade-in');
                          observer.unobserve(el);
                        }
                      });
                    },
                    { threshold: 0.3 }
                  );
                  observer.observe(el);
                }
              }}
            >
              Bored? Try clicking on the text above ↑
            </p>

            {/* Right side - LinkedIn & Resume */}
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/redisitic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={32} />
              </a>
              <button
                onClick={handleResumeClick}
                className={`text-white/60 hover:text-white transition-all duration-400 ${
                  resumeAnimating ? 'scale-[3] opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <FileText size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Overlay */}
      {showResume && (
        <div 
          className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm ${
            resumeClosing ? 'animate-fade-out-overlay' : 'animate-fade-in-overlay'
          }`}
          onClick={handleCloseResume}
        >
          <div 
            className={`relative w-[90vw] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden ${
              resumeClosing ? 'animate-scale-out' : 'animate-scale-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseResume}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black hover:bg-white text-white hover:text-black rounded-full transition-colors duration-200"
            >
              ✕
            </button>
            <iframe
              src="../assets/resume.pdf"
              className="w-full h-full"
              title="Resume"
            />
          </div>
        </div>
      )}
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
        
        @keyframes fade-in-overlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-out-overlay {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes scale-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-out 1s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-overlay {
          animation: fade-in-overlay 0.3s ease-out forwards;
        }
        
        .animate-fade-out-overlay {
          animation: fade-out-overlay 0.4s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-scale-out {
          animation: scale-out 0.4s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
        }
        
        .highlighted {
          color: #60a5fa;
          font-weight: 600;
        }
      `}</style>
      <div className="relative min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Sticky heading container */}
          {/* <div 
            id="experience-sticky"
            className={`${experienceSticky ? 'sticky' : 'relative'} top-0 z-40 pb-8 pt-16 transition-all duration-700 ease-in-out`}
            style={{
              background: experienceSticky 
                ? 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 60%, transparent 100%)'
                : 'transparent'
            }}
          > */}
            <div id="experience" className="relative">
              <ScrollFloat
                animationDuration={2}
                ease='back.inOut(2)'
                scrollStart='center bottom+=50%'
                scrollEnd='bottom bottom-=70%'
                stagger={0.1}
              >
                My Experience
              </ScrollFloat>
            </div>
          {/* </div> */}
          
          {/* Cards container with negative margin to overlap with sticky header */}
          <div className="mt-12">
            <CustomScrollStack 
              height="90vh"
              /* onComplete={() => setStackComplete(true)}
              onScrollChange={(data) => {
                if (!data.isComplete && stackComplete) {
                  setStackComplete(false);
                }
              }} */
            >
              {/* HCL Tech */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">Internal PenTest Assistant</h3>
                      <p className="text-xl text-white/80 mt-2">HCL Tech</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">June 2025 - July 2025</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Utilized automated security scanners (Nessus, Qualys) to identify vulnerabilities</li>
                    <li>• Developed custom Python and Bash scripts for vulnerability detection and exploitation</li>
                    <li>• Created OWASP Top 10 demonstration labs for internal training</li>
                    <li>• Designed centralized logging and monitoring solutions for real-time threat detection</li>
                  </ul>
                </div>
              </CustomScrollStackItem>

              {/* Integrated Tech9 */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">Cybersecurity Intern</h3>
                      <p className="text-xl text-white/80 mt-2">Integrated Tech9</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">June 2025 - July 2025</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Deployed and configured Wazuh SIEM across internal systems</li>
                    <li>• Integrated alerting and rule-based detection for common threats</li>
                    <li>• Collaborated with IT and security teams on centralized logging</li>
                    <li>• Improved incident response workflows and system visibility</li>
                  </ul>
                </div>
              </CustomScrollStackItem>

              {/* SDC KJSCE */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">UI/UX Designer & Web Developer</h3>
                      <p className="text-xl text-white/80 mt-2">Software Development Cell KJSCE</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">June 2024 - October 2024</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Developed Elective Allotment Portal as a college project</li>
                    <li>• Implemented responsive front-end features using Laravel</li>
                    <li>• Streamlined elective selection process for students</li>
                    <li>• Ensured seamless navigation across devices</li>
                  </ul>
                </div>
              </CustomScrollStackItem>

              {/* Meshcraft */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">Senior 3D Designer</h3>
                      <p className="text-xl text-white/80 mt-2">Meshcraft · Internship</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">June 2024 - August 2024</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Created high-quality 3D models and assets for various projects</li>
                    <li>• Collaborated with design teams on product visualization and rendering</li>
                    <li>• Optimized 3D workflows for efficient asset creation and delivery</li>
                    <li>• Contributed to client presentations with photorealistic renders</li>
                  </ul>
                </div>
              </CustomScrollStackItem>

              {/* DeepCytes */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">Red Team Member</h3>
                      <p className="text-xl text-white/80 mt-2">DeepCytes</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">May 2024 - June 2024</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Orchestrated Red Team operations using Cobalt Strike, Empire, and BloodHound</li>
                    <li>• Conducted VAPT on web applications, APIs, and network infrastructure</li>
                    <li>• Engineered social engineering campaigns including phishing simulations</li>
                    <li>• Leveraged OSINT methodologies to map attack surfaces and identify weaknesses</li>
                  </ul>
                </div>
              </CustomScrollStackItem>

              {/* IndicVerse */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">3D Generalist</h3>
                      <p className="text-xl text-white/80 mt-2">IndicVerse · Internship</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">March 2024 - October 2024</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Produced diverse 3D content including modeling, texturing, and animation</li>
                    <li>• Worked on multiple project pipelines from concept to final delivery</li>
                    <li>• Implemented efficient workflows for asset creation and scene assembly</li>
                    <li>• Collaborated with cross-functional teams on visual storytelling</li>
                  </ul>
                </div>
              </CustomScrollStackItem>

              {/* CSI KJSCE */}
              <CustomScrollStackItem>
                <div className="text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold">Creative Team Member</h3>
                      <p className="text-xl text-white/80 mt-2">CSI KJSCE Student Chapter</p>
                    </div>
                    <span className="text-sm bg-white/20 px-4 py-2 rounded-full">June 2023 - June 2024</span>
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li>• Co-organized UI/UX workshop for 50+ students</li>
                    <li>• Designed promotional materials increasing event participation by 30%</li>
                    <li>• Contributed to end-to-end event planning and content flow</li>
                    <li>• Delivered hands-on demonstrations on UX heuristics and design patterns</li>
                  </ul>
                </div>
              </CustomScrollStackItem>
            </CustomScrollStack>
          </div>
        </div>
      </div>

      {/* Glassmorphic Footer */}
      <footer className="relative mt-32 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Logo Section */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-2 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M895.363 434.76C880.118 398.862 854.792 368.399 822.863 346.836C806.976 336.119 789.396 327.595 770.529 321.782C751.788 315.843 731.762 312.742 711.091 312.742C684.59 312.742 659.134 317.912 635.877 327.344C633.933 328.111 632.129 328.881 630.325 329.789C609.388 338.956 590.258 351.868 573.852 367.237C568.552 372.269 563.516 377.564 558.468 383.503C549.559 393.704 540.384 405.456 531.463 417.333C529.657 419.777 527.714 422.363 525.91 424.823C521.001 431.531 474.081 500.225 465.815 512.493C461.676 518.683 456.767 525.656 451.466 533.273C450.305 534.951 449.019 536.766 447.731 538.568C438.936 551.091 429.117 564.266 420.069 575.892C415.551 581.692 411.021 587.114 407.146 591.64C403.147 596.281 399.525 600.026 396.937 602.483C385.832 612.936 372.771 621.461 358.435 627.274C344.088 633.087 328.451 636.314 311.906 636.314C300.536 636.314 289.556 634.761 279.222 631.925C273.922 630.501 268.748 628.697 263.712 626.503C241.477 617.198 222.484 601.45 209.171 581.691C202.457 571.755 197.156 560.911 193.535 549.285C190.051 537.659 187.983 525.404 187.983 512.492C187.983 495.318 191.479 479.178 197.674 464.323C207.114 442.12 222.875 423.27 242.651 409.84C252.594 403.12 263.446 397.962 275.082 394.343C286.705 390.724 298.983 388.671 311.906 388.671C328.451 388.795 344.088 391.898 358.435 397.699C372.772 403.636 385.832 412.034 396.937 422.487C399.525 424.946 403.147 428.816 407.146 433.343C414.125 441.476 422.391 451.929 430.67 462.912C433.9 467.3 437.131 471.688 440.361 476.202C452.766 458.133 474.471 426.37 485.841 409.965C483.911 407.38 481.968 404.809 480.036 402.223C474.861 395.628 469.688 389.311 464.528 383.498C459.353 377.559 454.443 372.264 449.144 367.232C431.313 350.436 410.252 336.757 387.118 327.338C363.86 317.906 338.395 312.735 311.906 312.735C284.383 312.735 258.02 318.296 233.993 328.496C198.066 343.602 167.69 368.909 146.109 400.797C135.383 416.685 126.864 434.363 120.92 453.088C115.104 471.943 112 491.828 112 512.495C112 539.995 117.552 566.335 127.637 590.217C142.88 626.242 168.208 656.592 199.998 678.153C216.024 688.872 233.604 697.382 252.47 703.321C271.209 709.134 291.237 712.235 311.908 712.235C338.396 712.235 363.863 707.065 387.12 697.647C410.253 688.215 431.188 674.533 449.02 657.877L449.145 657.751C454.446 652.845 459.356 647.411 464.529 641.472C473.438 631.272 482.613 619.532 491.534 607.654C493.34 605.195 495.283 602.736 497.087 600.289C501.996 593.443 566.23 499.316 571.519 491.701C572.692 490.023 573.98 488.22 575.265 486.405C584.062 474.009 593.88 460.709 602.928 449.096C607.446 443.283 611.976 437.86 615.851 433.346C619.852 428.693 623.474 424.948 626.06 422.49C637.165 412.037 650.226 403.639 664.563 397.702C668.059 396.289 671.542 395.13 675.162 393.956C686.532 390.604 698.546 388.8 711.091 388.674C728.277 388.798 744.558 392.154 759.284 398.483C781.507 407.776 800.513 423.524 813.814 443.283C820.54 453.231 825.839 464.076 829.449 475.687C833.071 487.313 835.014 499.581 835.014 512.493C835.014 529.667 831.518 545.933 825.323 560.647C815.883 582.851 800.122 601.841 780.346 615.13C770.403 621.851 759.55 627.147 747.915 630.628C736.418 634.247 724.014 636.316 711.091 636.316C694.546 636.316 678.909 633.088 664.562 627.275C650.225 621.462 637.163 612.938 626.058 602.485C623.471 600.026 619.849 596.156 615.849 591.642C608.87 583.635 600.593 573.043 592.325 562.074C588.97 557.685 585.738 553.158 582.508 548.644C581.473 550.194 580.439 551.747 579.278 553.423C557.951 584.669 544.51 604.426 537.152 615.132C539.083 617.717 541.027 620.176 542.957 622.761C548.132 629.343 553.306 635.673 558.466 641.472C563.513 647.41 568.55 652.845 573.85 657.751C591.681 674.533 612.744 688.215 635.876 697.647C659.134 707.065 684.588 712.235 711.089 712.235C738.611 712.235 764.975 706.688 788.876 696.613C824.93 681.381 855.293 656.074 876.885 624.174C887.6 608.299 896.268 590.734 902.074 571.883C907.895 553.158 911 533.148 911 512.495C911 484.994 905.448 458.654 895.363 434.76Z" fill="white"/>
                    <path d="M773.87 138L250.113 886.003" stroke="white" strokeWidth="75" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Rhythm Juneja</p>
                  <p className="text-white/60 text-sm">© 2025 All rights reserved</p>
                </div>
              </div>

              {/* Center Info */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-white/80 text-sm">Hosted on AWS</p>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">Powered by</span>
                  <a 
                    href="https://react-bits.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors font-semibold text-sm"
                  >
                    React Bits
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/redisitic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/redisitic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;