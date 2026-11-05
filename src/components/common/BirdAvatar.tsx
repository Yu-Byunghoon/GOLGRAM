import React from 'react';
import { getBirdLevel } from '../../data/birdLevels';

interface BirdAvatarProps {
  level: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BirdAvatar: React.FC<BirdAvatarProps> = ({
  level,
  size = 'md',
  showBadge = false,
  className = '',
  onClick
}) => {
  const bird = getBirdLevel(level);

  const sizeDimensions = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const badgeDimensions = {
    xs: 'text-[9px] -bottom-1 -right-1 px-1',
    sm: 'text-[10px] -bottom-1 -right-1 px-1.5',
    md: 'text-[11px] -bottom-1.5 -right-1.5 px-1.5 py-0.2',
    lg: 'text-xs -bottom-1.5 -right-1 px-2 py-0.5',
    xl: 'text-xs -bottom-2 -right-1 px-2.5 py-0.5',
    '2xl': 'text-sm -bottom-2 -right-1 px-3 py-1',
  };

  // Render unique cute vector bird characters for all 22 levels
  const renderBirdVector = () => {
    switch (bird.level) {
      case 1: // 병아리 (Baby Chick)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#FEF08A" />
            <ellipse cx="23" cy="38" rx="4" ry="2" fill="#FCA5A5" opacity="0.7" />
            <ellipse cx="41" cy="38" rx="4" ry="2" fill="#FCA5A5" opacity="0.7" />
            <circle cx="24" cy="30" r="3.5" fill="#1E293B" />
            <circle cx="23" cy="28.5" r="1.2" fill="#FFFFFF" />
            <circle cx="40" cy="30" r="3.5" fill="#1E293B" />
            <circle cx="39" cy="28.5" r="1.2" fill="#FFFFFF" />
            {/* Orange beak */}
            <polygon points="28,34 36,34 32,41" fill="#F97316" />
            {/* Golf Visor */}
            <path d="M 16 23 Q 32 14 48 23" stroke="#22C55E" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 18 22 Q 32 18 46 22 L 52 26 Q 32 20 12 26 Z" fill="#16A34A" />
            {/* Chick tuft hair */}
            <path d="M 32 12 Q 35 6 36 10" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 2: // 참새 (Sparrow)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#FDE68A" />
            {/* Brown cap & cheeks */}
            <path d="M 14 26 Q 32 10 50 26 Q 52 38 48 46 Q 32 54 16 46 Z" fill="#92400E" opacity="0.3" />
            <circle cx="18" cy="38" r="4.5" fill="#78350F" />
            <circle cx="46" cy="38" r="4.5" fill="#78350F" />
            <circle cx="23" cy="31" r="3.5" fill="#1E293B" />
            <circle cx="22" cy="29.5" r="1.2" fill="#FFFFFF" />
            <circle cx="41" cy="31" r="3.5" fill="#1E293B" />
            <circle cx="40" cy="29.5" r="1.2" fill="#FFFFFF" />
            <polygon points="28,34 36,34 32,40" fill="#EA580C" />
            {/* Small golf tee in mouth or cap */}
            <rect x="30" y="41" width="4" height="7" rx="1.5" fill="#FBBF24" />
          </svg>
        );

      case 3: // 제비 (Swallow)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#0F172A" />
            {/* White chest bib */}
            <path d="M 20 34 Q 32 26 44 34 Q 46 54 32 58 Q 18 54 20 34 Z" fill="#F8FAFC" />
            {/* Red throat patch */}
            <path d="M 26 34 Q 32 30 38 34 Q 32 42 26 34 Z" fill="#DC2626" />
            <circle cx="22" cy="26" r="3" fill="#38BDF8" />
            <circle cx="21" cy="25" r="1" fill="#FFFFFF" />
            <circle cx="42" cy="26" r="3" fill="#38BDF8" />
            <circle cx="41" cy="25" r="1" fill="#FFFFFF" />
            <polygon points="29,31 35,31 32,36" fill="#F59E0B" />
            {/* Swallow fork tail wing accent */}
            <path d="M 10 24 L 6 16 L 16 20 Z" fill="#0284C7" />
            <path d="M 54 24 L 58 16 L 48 20 Z" fill="#0284C7" />
          </svg>
        );

      case 4: // 펭귄 (Penguin)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#1E293B" />
            {/* White face/belly */}
            <ellipse cx="32" cy="38" rx="18" ry="18" fill="#FFFFFF" />
            <circle cx="24" cy="30" r="3.2" fill="#0F172A" />
            <circle cx="23" cy="28.5" r="1" fill="#FFFFFF" />
            <circle cx="40" cy="30" r="3.2" fill="#0F172A" />
            <circle cx="39" cy="28.5" r="1" fill="#FFFFFF" />
            {/* Golden beak */}
            <polygon points="27,34 37,34 32,41" fill="#F59E0B" />
            {/* Green bow tie for golf gentlemen */}
            <polygon points="26,48 38,48 32,53" fill="#16A34A" />
            <polygon points="26,58 38,58 32,53" fill="#16A34A" />
            <circle cx="32" cy="53" r="2" fill="#D97706" />
          </svg>
        );

      case 5: // 꾀꼬리 (Oriole)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#FACC15" />
            {/* Black eye mask line */}
            <path d="M 12 28 Q 32 24 52 28" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <circle cx="23" cy="28" r="3.5" fill="#FFFFFF" />
            <circle cx="23" cy="28" r="2" fill="#0F172A" />
            <circle cx="41" cy="28" r="3.5" fill="#FFFFFF" />
            <circle cx="41" cy="28" r="2" fill="#0F172A" />
            <polygon points="28,33 36,33 32,42" fill="#FB923C" />
            {/* Musical note accent */}
            <circle cx="48" cy="18" r="2.5" fill="#EAB308" />
            <path d="M 50 18 L 50 10 L 55 9" stroke="#EAB308" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 6: // 뻐꾸기 (Cuckoo)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#94A3B8" />
            {/* Striped breast */}
            <path d="M 20 40 Q 32 36 44 40 Q 46 54 32 58 Q 18 54 20 40 Z" fill="#F1F5F9" />
            <line x1="24" y1="44" x2="40" y2="44" stroke="#64748B" strokeWidth="1.8" />
            <line x1="26" y1="48" x2="38" y2="48" stroke="#64748B" strokeWidth="1.8" />
            <line x1="28" y1="52" x2="36" y2="52" stroke="#64748B" strokeWidth="1.8" />
            {/* Yellow eye rings */}
            <circle cx="23" cy="27" r="4.5" fill="#FBBF24" />
            <circle cx="23" cy="27" r="2.5" fill="#0F172A" />
            <circle cx="41" cy="27" r="4.5" fill="#FBBF24" />
            <circle cx="41" cy="27" r="2.5" fill="#0F172A" />
            <polygon points="28,32 36,32 32,39" fill="#EA580C" />
          </svg>
        );

      case 7: // 비둘기 (Pigeon)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#CBD5E1" />
            {/* Iridescent neck patch */}
            <ellipse cx="32" cy="44" rx="16" ry="12" fill="#A78BFA" opacity="0.4" />
            <ellipse cx="32" cy="44" rx="14" ry="10" fill="#34D399" opacity="0.3" />
            {/* Orange ring eyes */}
            <circle cx="22" cy="28" r="4" fill="#FB923C" />
            <circle cx="22" cy="28" r="2" fill="#0F172A" />
            <circle cx="42" cy="28" r="4" fill="#FB923C" />
            <circle cx="42" cy="28" r="2" fill="#0F172A" />
            {/* Soft pink beak with white cere */}
            <circle cx="32" cy="32" r="3.5" fill="#F8FAFC" />
            <polygon points="29,34 35,34 32,40" fill="#F472B6" />
          </svg>
        );

      case 8: // 까치 (Magpie)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#0F172A" />
            {/* Pure white belly & cheek patches */}
            <ellipse cx="32" cy="45" rx="15" ry="13" fill="#FFFFFF" />
            <ellipse cx="14" cy="32" rx="4" ry="7" fill="#FFFFFF" />
            <ellipse cx="50" cy="32" rx="4" ry="7" fill="#FFFFFF" />
            {/* Shimmering blue wing tips */}
            <path d="M 6 30 Q 14 20 18 34 Z" fill="#2563EB" />
            <path d="M 58 30 Q 50 20 46 34 Z" fill="#2563EB" />
            <circle cx="24" cy="26" r="3.2" fill="#FFFFFF" />
            <circle cx="24" cy="26" r="1.8" fill="#000000" />
            <circle cx="40" cy="26" r="3.2" fill="#FFFFFF" />
            <circle cx="40" cy="26" r="1.8" fill="#000000" />
            <polygon points="28,30 36,30 32,38" fill="#334155" />
          </svg>
        );

      case 9: // 딱따구리 (Woodpecker)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#334155" />
            {/* Bright red crest */}
            <path d="M 22 14 Q 32 4 42 14 L 38 24 L 26 24 Z" fill="#EF4444" />
            {/* Face stripes */}
            <path d="M 12 30 Q 32 26 52 30" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            <circle cx="22" cy="30" r="2.8" fill="#0F172A" />
            <circle cx="42" cy="30" r="2.8" fill="#0F172A" />
            {/* Long stout beak */}
            <polygon points="28,33 36,33 32,46" fill="#F59E0B" />
          </svg>
        );

      case 10: // 두루미 (Red-crowned Crane)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#F8FAFC" />
            {/* Red crown patch */}
            <ellipse cx="32" cy="14" rx="7" ry="4" fill="#DC2626" />
            {/* Black neck band */}
            <path d="M 16 42 Q 32 48 48 42 L 50 56 Q 32 60 14 56 Z" fill="#0F172A" />
            <circle cx="23" cy="26" r="3.2" fill="#0F172A" />
            <circle cx="22" cy="25" r="1" fill="#FFFFFF" />
            <circle cx="41" cy="26" r="3.2" fill="#0F172A" />
            <circle cx="40" cy="25" r="1" fill="#FFFFFF" />
            {/* Elegant slender olive beak */}
            <polygon points="29,30 35,30 32,42" fill="#65A30D" />
          </svg>
        );

      case 11: // 기러기 (Wild Goose)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#475569" />
            {/* White cheek patch (like Canada Goose) */}
            <path d="M 16 30 Q 32 40 48 30 L 44 42 Q 32 48 20 42 Z" fill="#F8FAFC" />
            <circle cx="23" cy="24" r="3" fill="#FFFFFF" />
            <circle cx="23" cy="24" r="1.8" fill="#0F172A" />
            <circle cx="41" cy="24" r="3" fill="#FFFFFF" />
            <circle cx="41" cy="24" r="1.8" fill="#0F172A" />
            <polygon points="28,32 36,32 32,42" fill="#1E293B" />
          </svg>
        );

      case 12: // 까투리 (Pheasant)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#78350F" />
            {/* Mottled brown patterns */}
            <ellipse cx="32" cy="40" rx="18" ry="14" fill="#B45309" />
            <circle cx="24" cy="40" r="3" fill="#FEF3C7" opacity="0.7" />
            <circle cx="40" cy="40" r="3" fill="#FEF3C7" opacity="0.7" />
            <circle cx="32" cy="46" r="3" fill="#FEF3C7" opacity="0.7" />
            {/* Eyes */}
            <circle cx="23" cy="26" r="3" fill="#FEF3C7" />
            <circle cx="23" cy="26" r="1.8" fill="#1E293B" />
            <circle cx="41" cy="26" r="3" fill="#FEF3C7" />
            <circle cx="41" cy="26" r="1.8" fill="#1E293B" />
            <polygon points="28,30 36,30 32,38" fill="#D97706" />
          </svg>
        );

      case 13: // 갈매기 (Seagull)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#F8FAFC" />
            {/* Gray mantle cap */}
            <path d="M 14 18 Q 32 10 50 18 Q 42 30 22 30 Z" fill="#94A3B8" opacity="0.5" />
            <circle cx="23" cy="27" r="3.5" fill="#FACC15" />
            <circle cx="23" cy="27" r="1.8" fill="#0F172A" />
            <circle cx="41" cy="27" r="3.5" fill="#FACC15" />
            <circle cx="41" cy="27" r="1.8" fill="#0F172A" />
            {/* Yellow bill with distinctive red spot */}
            <polygon points="27,32 37,32 32,44" fill="#F59E0B" />
            <circle cx="32" cy="40" r="1.8" fill="#DC2626" />
          </svg>
        );

      case 14: // 백조 (Swan)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#F0FDF4" />
            {/* Black facial mask */}
            <polygon points="26,26 38,26 35,34 29,34" fill="#0F172A" />
            {/* Orange bill with black basal knob */}
            <circle cx="32" cy="29" r="2.8" fill="#000000" />
            <polygon points="28,32 36,32 32,43" fill="#EA580C" />
            {/* Serene eyes */}
            <circle cx="21" cy="27" r="2.5" fill="#0F172A" />
            <circle cx="43" cy="27" r="2.5" fill="#0F172A" />
            {/* Crown of greens */}
            <path d="M 22 14 L 26 20 L 32 13 L 38 20 L 42 14" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 15: // 부엉이 (Owl)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#4C1D95" />
            {/* Feather tufts / ears */}
            <polygon points="12,18 20,8 24,20" fill="#6D28D9" />
            <polygon points="52,18 44,8 40,20" fill="#6D28D9" />
            {/* Big luminescent owl eyes */}
            <circle cx="22" cy="30" r="8" fill="#FDE047" />
            <circle cx="22" cy="30" r="4.5" fill="#1E1B4B" />
            <circle cx="20" cy="28" r="1.5" fill="#FFFFFF" />
            <circle cx="42" cy="30" r="8" fill="#FDE047" />
            <circle cx="42" cy="30" r="4.5" fill="#1E1B4B" />
            <circle cx="40" cy="28" r="1.5" fill="#FFFFFF" />
            <polygon points="29,36 35,36 32,43" fill="#F97316" />
          </svg>
        );

      case 16: // 송골매 (Falcon)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#334155" />
            {/* Malar stripe / sideburns */}
            <polygon points="18,30 24,30 20,44" fill="#0F172A" />
            <polygon points="46,30 40,30 44,44" fill="#0F172A" />
            {/* Fierce yellow eye ceres */}
            <circle cx="23" cy="27" r="4.5" fill="#FACC15" />
            <circle cx="23" cy="27" r="2.6" fill="#000000" />
            <circle cx="41" cy="27" r="4.5" fill="#FACC15" />
            <circle cx="41" cy="27" r="2.6" fill="#000000" />
            {/* Hooked predatory beak */}
            <path d="M 28 31 L 36 31 L 34 39 Q 32 44 28 41 Z" fill="#F59E0B" />
          </svg>
        );

      case 17: // 학 (Crane)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#042F2E" />
            {/* Pure white face */}
            <circle cx="32" cy="32" r="22" fill="#F8FAFC" />
            {/* Sage crown & jade eye accents */}
            <circle cx="32" cy="16" r="3.5" fill="#DC2626" />
            <circle cx="23" cy="29" r="3" fill="#0F766E" />
            <circle cx="23" cy="29" r="1.5" fill="#042F2E" />
            <circle cx="41" cy="29" r="3" fill="#0F766E" />
            <circle cx="41" cy="29" r="1.5" fill="#042F2E" />
            <polygon points="29,33 35,33 32,46" fill="#0F766E" />
          </svg>
        );

      case 18: // 타조 (Ostrich)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#EA580C" />
            {/* Big friendly eyes with lashes */}
            <circle cx="22" cy="26" r="6.5" fill="#FFFFFF" />
            <circle cx="22" cy="26" r="3.5" fill="#0F172A" />
            <line x1="16" y1="20" x2="19" y2="22" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="18" x2="22" y2="21" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            <circle cx="42" cy="26" r="6.5" fill="#FFFFFF" />
            <circle cx="42" cy="26" r="3.5" fill="#0F172A" />
            <line x1="48" y1="20" x2="45" y2="22" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            <line x1="43" y1="18" x2="42" y2="21" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            {/* Flat wide pink beak */}
            <rect x="23" y="34" width="18" height="9" rx="4.5" fill="#F472B6" />
          </svg>
        );

      case 19: // 펠리컨 (Pelican)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#312E81" />
            <circle cx="32" cy="28" r="18" fill="#FFFFFF" />
            <circle cx="24" cy="24" r="3" fill="#0F172A" />
            <circle cx="40" cy="24" r="3" fill="#0F172A" />
            {/* Huge elastic throat pouch holding a golf ball */}
            <path d="M 20 30 L 44 30 Q 48 50 32 54 Q 16 50 20 30 Z" fill="#FBBF24" />
            <circle cx="32" cy="42" r="4.5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
          </svg>
        );

      case 20: // 플라밍고 (Flamingo)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#FCE7F3" />
            <circle cx="32" cy="32" r="24" fill="#F472B6" />
            {/* Curved beak with black tip */}
            <path d="M 26 31 L 38 31 L 37 40 Q 34 48 28 46 L 27 38 Z" fill="#FB7185" />
            <path d="M 33 42 Q 34 48 28 46 L 29 42 Z" fill="#0F172A" />
            <circle cx="24" cy="26" r="3" fill="#FFFFFF" />
            <circle cx="24" cy="26" r="1.5" fill="#0F172A" />
            <circle cx="40" cy="26" r="3" fill="#FFFFFF" />
            <circle cx="40" cy="26" r="1.5" fill="#0F172A" />
            {/* Chic sunglasses */}
            <rect x="18" y="24" width="12" height="6" rx="2" fill="#1E293B" />
            <rect x="34" y="24" width="12" height="6" rx="2" fill="#1E293B" />
            <line x1="30" y1="27" x2="34" y2="27" stroke="#1E293B" strokeWidth="2" />
          </svg>
        );

      case 21: // 독수리 (Eagle)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            {/* Royal purple background with gold rim */}
            <circle cx="32" cy="32" r="28" fill="#581C87" stroke="#D4AF37" strokeWidth="2" />
            {/* White eagle head */}
            <circle cx="32" cy="32" r="20" fill="#FFFFFF" />
            {/* Piercing gold eagle eyes */}
            <polygon points="17,24 28,26 21,29" fill="#0F172A" />
            <circle cx="23" cy="27" r="2" fill="#EAB308" />
            <polygon points="47,24 36,26 43,29" fill="#0F172A" />
            <circle cx="41" cy="27" r="2" fill="#EAB308" />
            {/* Powerful curved golden beak */}
            <path d="M 26 31 L 38 31 L 36 38 Q 32 46 26 42 Z" fill="#F59E0B" />
            {/* Golden laurel leaves */}
            <path d="M 10 38 Q 14 48 24 54" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <path d="M 54 38 Q 50 48 40 54" stroke="#D4AF37" strokeWidth="2" fill="none" />
          </svg>
        );

      case 22: // 알바트로스 (Albatross - Mythical Supreme Level)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow">
            {/* Radiant golden aura */}
            <circle cx="32" cy="32" r="28" fill="#FEF08A" stroke="#D4AF37" strokeWidth="3" />
            <circle cx="32" cy="32" r="22" fill="#FFFFFF" />
            {/* Divine crown */}
            <path d="M 22 16 L 26 21 L 32 14 L 38 21 L 42 16 L 39 24 L 25 24 Z" fill="#D4AF37" />
            <circle cx="32" cy="14" r="1.5" fill="#EF4444" />
            <circle cx="22" cy="16" r="1.2" fill="#3B82F6" />
            <circle cx="42" cy="16" r="1.2" fill="#3B82F6" />
            {/* Wise celestial eyes */}
            <circle cx="24" cy="29" r="3" fill="#D4AF37" />
            <circle cx="24" cy="29" r="1.5" fill="#0F172A" />
            <circle cx="40" cy="29" r="3" fill="#D4AF37" />
            <circle cx="40" cy="29" r="1.5" fill="#0F172A" />
            {/* Majestic pink-gold bill */}
            <polygon points="28,34 36,34 32,46" fill="#F59E0B" />
            {/* Glowing sparkle */}
            <path d="M 32 6 L 33 10 L 37 11 L 33 12 L 32 16 L 31 12 L 27 11 L 31 10 Z" fill="#EAB308" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
            {level}
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full transition-transform hover:scale-105 ${
        sizeDimensions[size]
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title={`Lv.${bird.level} ${bird.koreanName} (${bird.title})`}
    >
      <div className="w-full h-full rounded-full overflow-hidden shadow-xs border border-black/5 flex items-center justify-center bg-white">
        {renderBirdVector()}
      </div>

      {showBadge && (
        <span
          className={`absolute rounded-full font-bold text-white shadow-xs font-mono leading-none flex items-center justify-center ${badgeDimensions[size]}`}
          style={{ backgroundColor: bird.themeColor }}
        >
          {bird.level}
        </span>
      )}
    </div>
  );
};
