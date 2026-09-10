import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { PORTFOLIO_DATA, PhotoItem } from '../data/portfolioData';
import {
  Camera,
  ExternalLink,
  Sliders,
  Eye,
  X,
  Aperture,
  Maximize2,
  Film,
  Sparkles,
  Layers,
  CheckCircle2,
  Focus,
  SunMedium,
  Grid
} from 'lucide-react';

interface PhotographySectionProps {
  onPlayClick?: () => void;
}

const CATEGORIES = [
  'All',
  'Editorial & Objects',
  'Horology Macro',
  'Architecture',
  'Moody Noir'
] as const;

export const PhotographySection: React.FC<PhotographySectionProps> = ({ onPlayClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [filmGrainEnabled, setFilmGrainEnabled] = useState<boolean>(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const photoData = PORTFOLIO_DATA.photography;
  const filteredGallery = photoData.gallery.filter(item =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="photography" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-ds-abyss text-ds-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="04"
          title="Photography &amp; Visual Craft"
          subtitle="Framing objects, horological mechanics, and architectural geometry through a moody filmic lens."
          badge="VSCO ARCHIVE // EDITORIAL CINEMATOGRAPHY"
        />

        {/* ========================================================================= */}
        {/* VSCO PROFILE HEADER & CONTROLS HUD                                        */}
        {/* ========================================================================= */}
        <div className="mb-12 rounded-3xl bg-ds-deep/30 border border-ds-sky/20 p-6 sm:p-8 backdrop-blur-2xl shadow-glass-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-ds-sky/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left Bio & VSCO Title */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs font-mono shadow-glow-subtle">
                  VSCO
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-ds-sky uppercase tracking-widest">
                    CURATED VISUAL ARCHIVE
                  </span>
                  <span className="text-xs text-ds-white/60 font-mono">@akshith // VSCO Journal</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 ml-2">
                  FEED SYNCED
                </span>
              </div>

              <p className="text-sm sm:text-base text-ds-white/80 font-light leading-relaxed">
                {photoData.bio}
              </p>
            </div>

            {/* Right Action Hub: External VSCO Link + Film Grain Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFilmGrainEnabled(!filmGrainEnabled)}
                data-cursor="button"
                data-cursor-text="GRAIN"
                className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all ${
                  filmGrainEnabled
                    ? 'bg-ds-ocean/50 border-ds-sky text-ds-white shadow-glow-subtle'
                    : 'bg-ds-deep/40 border-ds-sky/20 text-ds-white/60 hover:text-ds-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-ds-sky" />
                <span>FILM GRAIN: {filmGrainEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <a
                href={photoData.vscoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPlayClick}
                data-cursor="button"
                data-cursor-text="VSCO"
                className="px-5 py-2 rounded-xl bg-white text-ds-abyss font-mono text-xs font-bold uppercase tracking-wider hover:bg-ds-sky hover:text-ds-abyss transition-all flex items-center gap-2 shadow-glow-subtle"
              >
                <span>Open VSCO Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 pt-6 border-t border-ds-sky/15 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-ds-white/50 mr-2 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-ds-sky" />
              <span>COLLECTION:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (onPlayClick) onPlayClick();
                    setSelectedCategory(cat);
                  }}
                  data-cursor="button"
                  data-cursor-text={cat.toUpperCase()}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-ds-sky text-ds-abyss font-bold shadow-glow-sky'
                      : 'bg-ds-deep/40 border border-ds-sky/15 text-ds-white/70 hover:text-ds-white hover:bg-ds-sky/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL VSCO PHOTO GRID                                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredGallery.map((photo, index) => {
            const hasCustomImage = photo.imageSrc && !imageErrors[photo.id];

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => {
                  if (onPlayClick) onPlayClick();
                  setActivePhoto(photo);
                }}
                data-cursor="button"
                data-cursor-text="INSPECT"
                className={`group relative rounded-2xl overflow-hidden border border-ds-sky/20 bg-ds-deep/20 hover:border-ds-sky/60 transition-all duration-500 shadow-xl cursor-pointer ${
                  photo.aspectRatio === 'aspect-[4/5]' ? 'sm:row-span-2' : ''
                }`}
              >
                {/* Photo Display Frame */}
                <div className={`relative w-full h-72 sm:h-80 bg-gradient-to-br ${photo.fallbackGradient} overflow-hidden flex flex-col justify-between p-5`}>
                  {/* Real Image If Available */}
                  {hasCustomImage && (
                    <img
                      src={photo.imageSrc}
                      alt={photo.title}
                      onError={() => handleImageError(photo.id)}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  {/* Editorial Fallback Visual Graphic */}
                  {!hasCustomImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-700">
                      <div
                        className="w-20 h-20 rounded-2xl border flex items-center justify-center mb-3 backdrop-blur-md shadow-2xl"
                        style={{ borderColor: `${photo.accentColor}40`, backgroundColor: `${photo.accentColor}15` }}
                      >
                        <Camera className="w-9 h-9" style={{ color: photo.accentColor }} />
                      </div>
                      <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: photo.accentColor }}>
                        {photo.category}
                      </span>
                      <span className="font-display font-bold text-sm text-ds-white/90 mt-1 max-w-[220px]">
                        {photo.title}
                      </span>
                    </div>
                  )}

                  {/* Film Grain Texture Overlay */}
                  {filmGrainEnabled && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] mix-blend-overlay" />
                  )}

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ds-abyss/95 via-ds-abyss/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Top EXIF Badge Overlay */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-ds-abyss/80 border border-ds-sky/30 backdrop-blur-md text-[10px] font-mono text-ds-white/80">
                      {photo.vscoPreset}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-ds-abyss/80 border border-ds-sky/30 backdrop-blur-md flex items-center justify-center text-ds-sky opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Photo Caption & Telemetry Pill */}
                  <div className="relative z-10 space-y-2">
                    <div>
                      <span className="text-[10px] font-mono text-ds-sky tracking-wider uppercase block">
                        {photo.category}
                      </span>
                      <h4 className="font-display font-bold text-base text-ds-white group-hover:text-ds-sky transition-colors">
                        {photo.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-ds-white/10 text-[10px] font-mono text-ds-white/60">
                      <span>{photo.exif.focalLength}</span>
                      <span>•</span>
                      <span>{photo.exif.aperture}</span>
                      <span>•</span>
                      <span>{photo.exif.shutter}</span>
                      <span>•</span>
                      <span>ISO {photo.exif.iso}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* PHOTOGRAPHY CRAFT & TECHNICAL SKILLS MATRIX                               */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Focus className="w-4 h-4 text-ds-sky" />
            <h3 className="font-mono text-xs font-bold text-ds-sky tracking-widest uppercase">
              PHOTOGRAPHIC DISCIPLINES &amp; CRAFTSMANSHIP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {photoData.skills.map((skill, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-ds-deep/20 border border-ds-sky/15 hover:border-ds-sky/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-ds-sky font-bold block mb-2">0{i + 1}</span>
                  <h4 className="font-display font-bold text-sm text-ds-white mb-1.5">
                    {skill.title}
                  </h4>
                  <p className="text-xs text-ds-white/70 font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GEAR & OPTICS TELEMETRY STRIP                                             */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-ds-deep/30 border border-ds-ocean/20 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Aperture className="w-5 h-5 text-ds-sky shrink-0" />
            <span className="font-mono text-xs font-bold text-ds-white uppercase tracking-wider">
              OPTICAL ARSENAL &amp; SENSOR TELEMETRY:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
            {photoData.gear.map((g, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-ds-abyss/80 border border-ds-sky/15 font-mono text-[11px]">
                <span className="text-ds-white/40 block text-[9px] uppercase">{g.item}</span>
                <span className="text-ds-sky font-semibold">{g.spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE PHOTO LIGHTBOX & EXIF INSPECTION MODAL                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ds-abyss/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-ds-abyss border border-ds-sky/30 shadow-2xl overflow-hidden flex flex-col lg:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-ds-abyss/80 border border-ds-sky/30 text-ds-white hover:text-ds-sky flex items-center justify-center backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Photo Inspector Frame */}
              <div className={`lg:w-3/5 min-h-[320px] lg:min-h-[460px] bg-gradient-to-br ${activePhoto.fallbackGradient} relative flex items-center justify-center p-6 overflow-hidden`}>
                {activePhoto.imageSrc && !imageErrors[activePhoto.id] ? (
                  <img
                    src={activePhoto.imageSrc}
                    alt={activePhoto.title}
                    onError={() => handleImageError(activePhoto.id)}
                    className="max-h-[400px] w-auto object-contain rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <div
                      className="w-24 h-24 rounded-3xl border flex items-center justify-center mb-4 backdrop-blur-md shadow-2xl"
                      style={{ borderColor: `${activePhoto.accentColor}50`, backgroundColor: `${activePhoto.accentColor}20` }}
                    >
                      <Camera className="w-12 h-12" style={{ color: activePhoto.accentColor }} />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: activePhoto.accentColor }}>
                      {activePhoto.category}
                    </span>
                    <h3 className="font-display font-bold text-xl text-ds-white mt-1">
                      {activePhoto.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Right EXIF Data & Telemetry Column */}
              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-ds-deep/30 border-t lg:border-t-0 lg:border-l border-ds-sky/20">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-ds-sky uppercase tracking-widest">
                      {activePhoto.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-ds-white mt-1">
                      {activePhoto.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-ds-white/80 font-light leading-relaxed">
                    {activePhoto.description}
                  </p>

                  {/* EXIF Data Telemetry Table */}
                  <div className="pt-2 space-y-2 font-mono text-xs">
                    <span className="text-[10px] text-ds-white/40 uppercase tracking-wider block">
                      EXIF OPTICAL TELEMETRY:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-lg bg-ds-abyss/80 border border-ds-sky/15">
                        <span className="text-[9px] text-ds-white/40 block">FOCAL LENGTH</span>
                        <span className="text-ds-white font-bold">{activePhoto.exif.focalLength}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-ds-abyss/80 border border-ds-sky/15">
                        <span className="text-[9px] text-ds-white/40 block">APERTURE</span>
                        <span className="text-ds-sky font-bold">{activePhoto.exif.aperture}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-ds-abyss/80 border border-ds-sky/15">
                        <span className="text-[9px] text-ds-white/40 block">SHUTTER</span>
                        <span className="text-ds-white font-bold">{activePhoto.exif.shutter}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-ds-abyss/80 border border-ds-sky/15">
                        <span className="text-[9px] text-ds-white/40 block">ISO</span>
                        <span className="text-emerald-400 font-bold">{activePhoto.exif.iso}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-ds-abyss/80 border border-ds-sky/15 flex items-center justify-between">
                      <span className="text-[10px] text-ds-white/40 uppercase">COLOR RECIPE:</span>
                      <span className="text-ds-sky font-bold">{activePhoto.vscoPreset}</span>
                    </div>
                  </div>
                </div>

                {/* Lightbox Footer Actions */}
                <div className="pt-4 border-t border-ds-sky/15 flex items-center justify-between">
                  <a
                    href={photoData.vscoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-ds-sky hover:underline flex items-center gap-1.5"
                  >
                    <span>View on VSCO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="px-4 py-1.5 rounded-lg bg-ds-ocean/30 border border-ds-sky/40 text-xs font-mono text-ds-white hover:bg-ds-sky hover:text-ds-abyss transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
