import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Share2, Sparkles, User, Palette, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import EidCardPreview from "@/components/EidCardPreview";
import SkyBackground from "@/components/SkyBackground";
import StarBurstEffect from "@/components/StarBurstEffect";
import { generateCardCanvas } from "@/lib/generateCardCanvas";

type Step = "landing" | "identity" | "template" | "preview";

const ShimmerTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`font-display font-bold bg-clip-text text-transparent bg-[linear-gradient(110deg,#d4af37,45%,#fff8b0,55%,#d4af37)] bg-[length:200%_100%] animate-[shimmer_2s_infinite] drop-shadow-[0_2px_10px_rgba(212,175,55,0.8)] ${className}`}>
    {children}
  </h2>
);

const GlassContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`glass-panel rounded-[40px] shadow-2xl p-8 sm:p-12 border border-white/20 backdrop-blur-2xl ${className}`}>
    {children}
  </div>
);

const CustomEidCard = () => {
  const [step, setStep] = useState<Step>("landing");
  const [yourName, setYourName] = useState(() => localStorage.getItem("eid-user-name") || "");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [templateId, setTemplateId] = useState<"royal-teal" | "majestic-midnight" | "eternal-ivory">("royal-teal");
  const [isExporting, setIsExporting] = useState(false);

  // Auto-scrolling to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const templates = [
    { 
      id: "royal-teal", 
      name: "ROYAL TEAL", 
      desc: "Deep teal with radiant gold", 
      preview: "bg-[#134e4a]",
      accent: "#fcd34d"
    },
    { 
      id: "majestic-midnight", 
      name: "MAJESTIC MIDNIGHT", 
      desc: "Indigo blues with silver alabaster", 
      preview: "bg-[#1e1b4b]",
      accent: "#e2e8f0"
    },
    { 
      id: "eternal-ivory", 
      name: "ETERNAL IVORY", 
      desc: "Warm cream with rose gold", 
      preview: "bg-[#fffcf2]",
      accent: "#fb7185"
    }
  ] as const;

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const canvas = await generateCardCanvas({ 
        senderName: fromName || yourName, 
        receiverName: toName, 
        gender: gender,
        templateId: templateId,
        width: 800, 
        height: 1000 
      });
      const link = document.createElement("a");
      link.download = `eid-card-${toName || "friend"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Card downloaded successfully!");
    } catch (error) {
      console.error("Export failed", error);
      toast.error("Failed to download card.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      setIsExporting(true);
      try {
        const canvas = await generateCardCanvas({ 
          senderName: fromName || yourName, 
          receiverName: toName, 
          gender: gender,
          templateId: templateId,
          width: 800, 
          height: 1000 
        });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        
        if (blob) {
          const file = new File([blob], "eid-card.png", { type: "image/png" });
          await navigator.share({
            title: "Happy Eid!",
            text: `Sharing a personalized Eid card for you!`,
            files: [file],
          });
        }
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          toast.error("Failed to share card.");
        }
      } finally {
        setIsExporting(false);
      }
    } else {
      handleDownload();
    }
  };

  const stepVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden font-body text-slate-900 bg-background">
      <StarBurstEffect />
      <SkyBackground />
      
      {/* Header */}
      <header className="w-full max-w-5xl px-6 py-8 flex items-center justify-between z-20 relative">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-white/70 hover:text-white transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm">Main Site</span>
        </Link>
        
        <h1 className="font-display text-xs sm:text-sm text-white/50 tracking-[0.4em] font-bold uppercase">
          CARD CREATOR VIBE
        </h1>

        <div className="w-10 h-10" />
      </header>

      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center px-6 pb-20 z-10 relative">
        
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div 
              key="landing"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center space-y-12 max-w-2xl"
            >
              <div className="space-y-6">
                <span className="font-display text-7xl sm:text-9xl text-gold-glow block drop-shadow-[0_8px_32px_rgba(212,175,55,0.4)] mb-2 animate-pulse-glow">عید مبارک</span>
                <ShimmerTitle className="text-4xl sm:text-6xl tracking-tight">Create Your Eid Card</ShimmerTitle>
                <p className="text-white/70 text-lg sm:text-xl leading-relaxed font-light">
                  Personalize a premium Eid greeting card crafted with golden accents and celestial vibes. 
                  Share the magic of this night with your loved ones.
                </p>
              </div>
              <button
                onClick={() => setStep("identity")}
                className="group relative px-16 py-5 overflow-hidden rounded-full transition-all duration-300 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] bg-[length:200%_100%] animate-[shimmer_3s_infinite]" />
                <span className="relative z-10 font-display font-bold text-xl text-black/80 tracking-widest px-4">BEGIN THE JOURNEY</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20" />
              </button>
            </motion.div>
          )}

          {step === "identity" && (
            <motion.div 
              key="identity"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-lg"
            >
              <GlassContainer className="space-y-12">
                <div className="text-center space-y-3">
                  <h2 className="text-sm font-display font-black uppercase tracking-[0.4em] text-white/50 italic">Step 01</h2>
                  <ShimmerTitle className="text-2xl tracking-widest">YOUR IDENTITY</ShimmerTitle>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block ml-1">Your Name</label>
                    <input 
                      type="text"
                      placeholder="Umama"
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      className="w-full bg-white/5 border-b-2 border-white/10 px-0 py-4 text-2xl font-bold text-white outline-none focus:border-gold-glow transition-all placeholder:text-white/10"
                    />
                  </div>

                  <div className="space-y-8 pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#fde047] animate-pulse" />
                        <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Card Roles</span>
                      </div>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">From</label>
                        <input 
                          type="text"
                          placeholder="Akif"
                          value={fromName}
                          onChange={(e) => setFromName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold text-white outline-none focus:ring-1 focus:ring-gold-glow/30 transition-all text-center"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">To</label>
                        <input 
                          type="text"
                          placeholder="Sumu"
                          value={toName}
                          onChange={(e) => setToName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl font-bold text-white outline-none focus:ring-1 focus:ring-gold-glow/30 transition-all text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 text-center block italic">Recipient Gender</label>
                    <div className="flex bg-white/5 p-2 rounded-3xl border border-white/5">
                      {["Male", "Female", "Other"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setGender(g as any)}
                          className={`flex-1 py-4 rounded-2xl font-bold text-xs tracking-widest transition-all duration-500 overflow-hidden relative ${
                            gender === g 
                              ? "text-black shadow-[0_0_20px_rgba(253,224,71,0.2)]" 
                              : "text-white/30 hover:text-white/60"
                          }`}
                        >
                          {gender === g && (
                            <motion.div 
                              layoutId="gender-active"
                              className="absolute inset-0 bg-gradient-to-b from-[#fde047] to-[#bf953f]" 
                            />
                          )}
                          <span className="relative z-10">{g.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <button
                    onClick={() => {
                      if (!toName.trim()) return toast.error("Please enter Receiver's name");
                      setStep("template");
                    }}
                    className="w-full group relative py-6 bg-white/10 hover:bg-white/15 text-white rounded-[30px] font-display font-bold text-lg tracking-[0.2em] transition-all flex items-center justify-center gap-4 border border-white/10 hover:border-white/20 shadow-xl overflow-hidden"
                  >
                    SELECT DESIGN <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </GlassContainer>
            </motion.div>
          )}

          {step === "template" && (
            <motion.div 
              key="template"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-sm font-display font-medium uppercase tracking-[0.5em] text-white/40">Step 02</h2>
                <ShimmerTitle className="text-3xl sm:text-4xl tracking-widest uppercase">CHOOSE YOUR VIBE</ShimmerTitle>
                <p className="text-white/40 font-light text-sm italic tracking-wide">Crafting for <span className="text-gold-glow font-bold opacity-100">{toName}</span></p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setTemplateId(tpl.id as any)}
                    className={`group relative flex flex-col glass-panel rounded-[40px] overflow-hidden border transition-all p-5 duration-700 ${
                      templateId === tpl.id 
                        ? "border-gold-glow ring-1 ring-gold-glow/50 shadow-[0_0_50px_rgba(191,149,63,0.3)] scale-[1.05]" 
                        : "border-white/5 hover:border-white/20 grayscale-[0.8] hover:grayscale-0 hover:scale-[1.02]"
                    }`}
                  >
                    <div className={`aspect-[4/5] rounded-[30px] w-full ${tpl.preview} mb-8 flex items-center justify-center relative overflow-hidden shadow-inner`}>
                       <EidCardPreview 
                        variant="icon"
                        senderName=""
                        receiverName=""
                        gender={gender}
                        characterType="Standard"
                        templateId={tpl.id as any}
                       />
                       {templateId === tpl.id && (
                         <div className="absolute inset-0 bg-gold-glow/5 pointer-events-none" />
                       )}
                       <div className="absolute top-4 right-4 z-20">
                         <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                           templateId === tpl.id ? "bg-gold-glow border-gold-glow text-black scale-110 shadow-lg" : "bg-black/50 border-white/20 text-transparent"
                         }`}>
                           <CheckCircle2 className="w-5 h-5" />
                         </div>
                       </div>
                    </div>
                    <div className="text-center pb-2">
                      <h3 className="font-display font-bold text-xs tracking-[0.3em] text-white/90 mb-2">{tpl.name}</h3>
                      <p className="text-[9px] text-white/40 font-medium leading-relaxed tracking-widest uppercase">{tpl.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 px-4">
                <button
                  onClick={() => setStep("identity")}
                  className="w-full sm:w-auto px-8 py-3 text-white/30 font-display font-bold text-sm tracking-widest hover:text-white transition-all flex items-center gap-3 uppercase"
                >
                  <ArrowLeft className="w-5 h-5" /> Back to identity
                </button>
                <button
                  onClick={() => setStep("preview")}
                  className="w-full sm:w-auto group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-300 active:scale-95 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-600 group-hover:scale-110 transition-transform duration-500" />
                  <span className="relative z-10 font-display font-bold text-lg text-white tracking-widest flex items-center gap-3">
                    FINALIZE JOURNEY <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div 
              key="preview"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="w-full max-w-lg mx-auto relative lg:order-last">
                <motion.div 
                  initial={{ rotateY: 15, rotateX: 5 }}
                  animate={{ rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] rounded-[32px] overflow-hidden"
                >
                  <EidCardPreview 
                    senderName={fromName || yourName}
                    receiverName={toName}
                    gender={gender}
                    characterType="Standard"
                    templateId={templateId}
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                </motion.div>
                {/* Decorative glow behind card */}
                <div className="absolute -inset-16 bg-gold-glow/20 blur-[120px] rounded-full z-0 animate-pulse-glow" />
              </div>

              <div className="space-y-12 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-gold-glow px-6 py-2.5 rounded-full text-[10px] font-display font-bold uppercase tracking-[0.4em] border border-gold-glow/20 shadow-lg">
                    <Sparkles className="w-4 h-4" /> Celestial design ready
                  </div>
                  <ShimmerTitle className="text-5xl sm:text-7xl leading-[1.05] tracking-tight">
                    The Magic <br /> is Yours.
                  </ShimmerTitle>
                  <p className="text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                    Your personalized Eid card is infused with moonlight and magic. 
                    Share this radiant wish with <strong className="text-white/90">{toName}</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                  <button
                    onClick={handleDownload}
                    disabled={isExporting}
                    className="group relative flex-1 lg:flex-none px-12 py-6 overflow-hidden rounded-[30px] transition-all duration-300 disabled:opacity-50 active:scale-95 shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-white" />
                    <span className="relative z-10 font-display font-black text-lg text-black tracking-widest flex items-center justify-center gap-3">
                      <Download className="w-6 h-6" /> {isExporting ? "PREPARING..." : "DOWNLOAD"}
                    </span>
                  </button>
                  <button
                     onClick={handleShare}
                     disabled={isExporting}
                     className="group relative flex-1 lg:flex-none px-12 py-6 overflow-hidden rounded-[30px] transition-all duration-300 disabled:opacity-50 active:scale-95 bg-white/5 border border-white/20 hover:bg-white/10"
                  >
                    <span className="relative z-10 font-display font-bold text-lg text-white tracking-widest flex items-center justify-center gap-3">
                      <Share2 className="w-6 h-6" /> SHARE
                    </span>
                  </button>
                </div>

                <div className="pt-8">
                   <button 
                    onClick={() => setStep("template")}
                    className="text-white/30 font-display font-bold text-xs hover:text-white flex items-center gap-3 mx-auto lg:mx-0 uppercase tracking-widest transition-colors"
                   >
                     <Palette className="w-4 h-4 text-gold-glow" /> Change card design
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CustomEidCard;
