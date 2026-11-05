import React from 'react';
import { BirdAvatar } from './BirdAvatar';
import { getBirdLevel } from '../../data/birdLevels';

interface UserBadgeProps {
  nickname: string;
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showBirdName?: boolean;
  className?: string;
  onClick?: () => void;
}

export const UserBadge: React.FC<UserBadgeProps> = ({
  nickname,
  level,
  size = 'md',
  showBirdName = true,
  className = '',
  onClick
}) => {
  const bird = getBirdLevel(level);

  const avatarSizeMap = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  };

  const textStyles = {
    sm: 'text-xs font-semibold',
    md: 'text-sm font-bold',
    lg: 'text-base font-bold',
  };

  const levelTagStyles = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-2.5 py-0.5',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none ${
        onClick ? 'cursor-pointer hover:opacity-90' : ''
      } ${className}`}
    >
      {/* 닉네임 왼쪽에 캐릭터 아이콘 */}
      <BirdAvatar level={level} size={avatarSizeMap[size]} />

      {/* 닉네임 */}
      <span className={`text-slate-900 truncate tracking-tight ${textStyles[size]}`}>
        {nickname}
      </span>

      {/* 오른쪽에 Lv. 숫자 표시 */}
      <span
        className={`font-mono font-bold rounded-md shrink-0 flex items-center gap-1 shadow-2xs border ${levelTagStyles[size]}`}
        style={{
          color: bird.themeColor,
          backgroundColor: bird.bgColor,
          borderColor: `${bird.themeColor}33`,
        }}
      >
        <span>Lv.{bird.level}</span>
        {showBirdName && (
          <span className="font-sans font-medium text-[0.85em] opacity-90">
            {bird.koreanName}
          </span>
        )}
      </span>
    </div>
  );
};
