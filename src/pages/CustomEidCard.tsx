import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2, Sparkles, User, Palette } from "lucide-react";
import { toast } from "sonner";
import EidCardPreview from "@/components/EidCardPreview";
import { generateCardCanvas } from "@/lib/generateCardCanvas";

const CustomEidCard = () => {
  const [senderName, setSenderName] = useState(() => localStorage.getItem("eid-user-name") || "");
  const [receiverName, setReceiverName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [characterType, setCharacterType] = useState<"Standard" | "Lantern" | "Festive">("Standard");
  const [backgroundStyle, setBackgroundStyle] = useState<"Elegant gold lantern" | "Floral Eid theme" | "Mosque arch theme">("Elegant gold lantern");
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const canvas = await generateCardCanvas({ senderName, receiverName, gender, width: 800, height: 1000 });
      const link = document.createElement("a");
      link.download = `eid-card-${senderName || "me"}.png`;
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
        const canvas = await generateCardCanvas({ senderName, receiverName, gender, width: 800, height: 1000 });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        
        if (blob) {
          const file = new File([blob], "eid-card.png", { type: "image/png" });
          await navigator.share({
            title: "Happy Eid!",
            text: `Sharing a personalized Eid card for you from ${senderName || "me"}`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FDF2F8] to-[#F5F3FF] flex flex-col items-center relative overflow-x-hidden font-body">
      
      {/* Header */}
      <header className="w-full max-w-7xl px-6 py-8 flex items-center justify-between z-20">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-[#831843] hover:text-[#4c0519] transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-pink-200 group-hover:bg-white/60">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold">Back to Home</span>
        </Link>
        
        <h1 className="hidden sm:block font-display text-2xl text-[#831843] tracking-wide">
          Create Your Eid Card
        </h1>
      </header>

      <main className="w-full max-w-7xl flex-1 flex flex-col lg:flex-row items-start justify-center gap-12 px-6 pb-20 z-10">
        
        {/* Right: Live Preview (Top on mobile) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg lg:order-last lg:sticky lg:top-8"
        >
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <span className="text-sm font-bold text-[#831843]/40 uppercase tracking-widest">Live Card Preview</span>
                <span className="text-xs font-medium text-pink-400">Updates instantly ✨</span>
             </div>
             
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-[40px] blur-2xl z-0 group-hover:from-pink-400/40 group-hover:to-purple-400/40 transition-all duration-500" />
                <div className="relative z-10 w-full">
                  <EidCardPreview 
                    id="eid-card-element"
                    senderName={senderName}
                    receiverName={receiverName}
                    gender={gender}
                    characterType={characterType}
                    backgroundStyle={backgroundStyle}
                  />
                </div>
             </div>
          </div>
        </motion.div>

        {/* Left: Customization Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[450px] bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl space-y-8 lg:order-first"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-display text-[#4c0519] flex items-center gap-2">
              <Sparkles className="text-pink-500 w-6 h-6" />
              Customize Card
            </h2>
            <p className="text-sm text-[#831843]/60 font-medium">Personalize your message and style</p>
          </div>

          <div className="space-y-6">
            {/* Names */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-[#831843]">Your Name</label>
                <input 
                  type="text"
                  placeholder="Sender Name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-white/90 border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400 transition-all font-bold text-[#4c0519] placeholder:text-gray-300 shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-[#831843]">Receiver Name</label>
                <input 
                  type="text"
                  placeholder="Receiver Name"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full bg-white/90 border border-pink-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400 transition-all font-bold text-[#4c0519] placeholder:text-gray-300 shadow-inner"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-bold text-[#831843] flex items-center gap-2">
                <User size={14} className="text-pink-400" /> Sender Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g as any)}
                    className={`py-3 rounded-2xl font-semibold transition-all ${
                      gender === g 
                        ? "bg-[#9D174D] text-white shadow-lg scale-[1.02]" 
                        : "bg-white text-[#831843] border border-pink-100 hover:bg-pink-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Character Selection */}
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest font-bold text-[#831843] flex items-center gap-2">
                <Sparkles size={14} className="text-pink-400" /> Choose Character Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Standard", "Lantern", "Festive"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCharacterType(p as any)}
                    className={`group relative aspect-square rounded-2xl border-2 transition-all overflow-hidden flex flex-col items-center justify-center p-2 ${
                      characterType === p 
                        ? "border-[#9D174D] bg-pink-50 shadow-md scale-[1.05]" 
                        : "border-pink-100 bg-white hover:border-pink-200 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-between">
                       <div className="flex-1 w-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          {/* Mini Character Preview */}
                          <div className="w-10 h-10 pointer-events-none transform group-hover:scale-110 transition-transform">
                             <EidCardPreview 
                                senderName="" 
                                receiverName="" 
                                gender={gender} 
                                characterType={p as any} 
                                backgroundStyle="Elegant gold lantern"
                                variant="icon" 
                             />
                          </div>
                       </div>
                       <span className={`text-[9px] font-bold uppercase tracking-tighter ${characterType === p ? "text-[#9D174D]" : "text-gray-400"}`}>
                          {p}
                       </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Style */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-bold text-[#831843] flex items-center gap-2">
                <Palette size={14} className="text-pink-400" /> Background Style
              </label>
              <div className="flex flex-col gap-2">
                {["Elegant gold lantern", "Floral Eid theme", "Mosque arch theme"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setBackgroundStyle(s as any)}
                    className={`px-5 py-4 rounded-2xl text-left font-semibold transition-all flex items-center justify-between ${
                      backgroundStyle === s 
                        ? "bg-[#9D174D] text-white shadow-lg" 
                        : "bg-white text-[#831843] border border-pink-100 hover:bg-pink-50"
                    }`}
                  >
                    {s}
                    {backgroundStyle === s && <motion.div layoutId="check" className="w-2 h-2 rounded-full bg-white transition-all shadow-sm" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-800 to-pink-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Download size={24} />
              {isExporting ? "Generating..." : "Download Card"}
            </button>
            <button
              onClick={handleShare}
              disabled={isExporting}
              className="w-full py-5 rounded-2xl bg-white text-[#831843] border-2 border-[#831843]/20 font-bold text-lg shadow-md hover:bg-pink-50 hover:border-[#831843]/40 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Share2 size={24} />
              Share Card
            </button>
          </div>
        </motion.div>
      </main>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default CustomEidCard;
