import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlbumPhoto } from '../../types';
import { UserBadge } from '../common/UserBadge';
import { GOLF_COURSES } from '../../data/golfCourses';
import {
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Download,
  Upload,
  Calendar,
  MapPin,
  Clock,
  Send,
  X,
  Share2
} from 'lucide-react';

export const AlbumView: React.FC = () => {
  const { albumPhotos, uploadAlbumPhoto, toggleLikePhoto, addPhotoComment, currentUser } = useApp();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState('전체');
  const [selectedPhoto, setSelectedPhoto] = useState<AlbumPhoto | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload form state
  const [newTitle, setNewTitle] = useState('');
  const [newCourseName, setNewCourseName] = useState('안양컨트리클럽');
  const [newDate, setNewDate] = useState('2026-11-05');
  const [newImageUrl, setNewImageUrl] = useState(
    'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1200&q=80'
  );
  const [newCompanions, setNewCompanions] = useState('김프로, 박싱글, 이이글');

  const oneYearAgoPhoto = albumPhotos.find((p) => p.isOneYearAgo);

  const filteredPhotos = albumPhotos.filter((photo) => {
    if (selectedCourseFilter !== '전체' && photo.courseName !== selectedCourseFilter) return false;
    return true;
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto || !commentInput.trim()) return;
    addPhotoComment(selectedPhoto.id, commentInput.trim());
    setCommentInput('');

    // Update active modal selected photo reference
    const updated = albumPhotos.find((p) => p.id === selectedPhoto.id);
    if (updated) setSelectedPhoto(updated);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = GOLF_COURSES.find((c) => c.name === newCourseName) || GOLF_COURSES[0];
    uploadAlbumPhoto({
      title: newTitle.trim() || `${newCourseName} 라운딩 추억`,
      courseId: course.id,
      courseName: newCourseName,
      date: newDate,
      imageUrl: newImageUrl,
      companions: newCompanions.split(',').map((c) => c.trim()).filter(Boolean),
    });
    setIsUploadModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-rose-500" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              추억 앨범 (골프 갤러리)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            골프장별 라운딩 사진, 1년 전 오늘의 추억, 동반자 태그 및 댓글/좋아요
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <Upload className="w-4 h-4" />
          사진 업로드 (갤러리)
        </button>
      </div>

      {/* 1 Year Ago Memory Spotlight */}
      {oneYearAgoPhoto && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600/10 via-rose-600/10 to-purple-600/10 border-2 border-amber-300/80 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-amber-700" />
            <span className="text-xs font-black tracking-wider uppercase text-amber-900">
              1년 전 오늘의 추억 (2025. 11. 05)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div
              className="md:col-span-1 rounded-2xl overflow-hidden bg-slate-200 aspect-video md:aspect-square cursor-pointer shadow-md"
              onClick={() => setSelectedPhoto(oneYearAgoPhoto)}
            >
              <img
                src={oneYearAgoPhoto.imageUrl}
                alt={oneYearAgoPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-slate-800">{oneYearAgoPhoto.courseName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{oneYearAgoPhoto.date}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{oneYearAgoPhoto.title}</h2>
              <p className="text-xs text-slate-600">
                함께한 동반자: <strong>{oneYearAgoPhoto.companions.join(', ')}</strong>
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => toggleLikePhoto(oneYearAgoPhoto.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    oneYearAgoPhoto.isLikedByUser
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${oneYearAgoPhoto.isLikedByUser ? 'fill-current' : ''}`} />
                  <span>좋아요 {oneYearAgoPhoto.likes}</span>
                </button>

                <button
                  onClick={() => setSelectedPhoto(oneYearAgoPhoto)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-slate-500" />
                  <span>댓글 {oneYearAgoPhoto.comments.length}개 보기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter by course */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-bold text-slate-400 shrink-0">골프장 필터:</span>
        <button
          onClick={() => setSelectedCourseFilter('전체')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCourseFilter === '전체'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          전체 보기
        </button>
        {Array.from(new Set(albumPhotos.map((p) => p.courseName))).map((cName) => (
          <button
            key={cName}
            onClick={() => setSelectedCourseFilter(cName)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCourseFilter === cName
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cName}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group"
          >
            {/* Image */}
            <div
              className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-xl">
                {photo.courseName}
              </div>
            </div>

            {/* Info & Caption */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{photo.date}</span>
                <span>동반 {photo.companions.length}명</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{photo.title}</h3>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <UserBadge
                  nickname={photo.uploaderNickname}
                  level={photo.uploaderLevel}
                  size="sm"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLikePhoto(photo.id)}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-rose-600 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        photo.isLikedByUser ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                    <span className="font-mono">{photo.likes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-mono">{photo.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Detail & Comments Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setSelectedPhoto(null)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{selectedPhoto.title}</h3>
                <p className="text-xs text-slate-400">
                  {selectedPhoto.courseName} · {selectedPhoto.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 max-h-80 flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-80 w-auto object-contain mx-auto"
                />
              </div>

              {/* Likes & Info */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <UserBadge
                  nickname={selectedPhoto.uploaderNickname}
                  level={selectedPhoto.uploaderLevel}
                  size="sm"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLikePhoto(selectedPhoto.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>좋아요 {selectedPhoto.likes}개</span>
                  </button>

                  <a
                    href={selectedPhoto.imageUrl}
                    download="golgram_round_photo.jpg"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>다운로드</span>
                  </a>
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  댓글 ({selectedPhoto.comments.length})
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedPhoto.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 py-2">첫 번째 댓글을 남겨보세요!</p>
                  ) : (
                    selectedPhoto.comments.map((cm) => (
                      <div key={cm.id} className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <UserBadge nickname={cm.nickname} level={cm.level} size="sm" />
                          <span className="text-[10px] text-slate-400 font-mono">
                            {cm.createdAt}
                          </span>
                        </div>
                        <p className="text-slate-700 pl-8">{cm.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="동반자에게 축하 댓글을 남겨보세요..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    등록
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsUploadModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="text-lg font-bold text-slate-900">추억 사진 업로드</h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">사진 제목</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 7번 홀 티박스에서 바라본 환상적인 적송림"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">방문 골프장</label>
                  <select
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    {GOLF_COURSES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">촬영 날짜</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">동반자 태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={newCompanions}
                  onChange={(e) => setNewCompanions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  placeholder="김프로, 박싱글"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">사진 이미지 URL (또는 프리셋 선택)</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNewImageUrl(
                        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
                      )
                    }
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
                  >
                    오션 링크스 뷰
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewImageUrl(
                        'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
                      )
                    }
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
                  >
                    클럽하우스 뷰
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewImageUrl(
                        'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=1200&q=80'
                      )
                    }
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
                  >
                    가을 페어웨이
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xs transition-colors"
              >
                앨범 업로드 완료 (+150 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
