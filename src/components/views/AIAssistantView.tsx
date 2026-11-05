import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GOLF_COURSES, getGolfCourseById } from '../../data/golfCourses';
import {
  Sparkles,
  Sun,
  CloudRain,
  Wind,
  Navigation,
  Car,
  Clock,
  Compass,
  Shirt,
  CheckSquare,
  Square,
  Send,
  Flag,
  AlertTriangle
} from 'lucide-react';

export const AIAssistantView: React.FC = () => {
  const { selectedCourseId } = useApp();

  const [targetCourseId, setTargetCourseId] = useState<string>(
    selectedCourseId || 'anyang-cc'
  );
  const [teeTime, setTeeTime] = useState<string>('08:30');
  const [userLocation, setUserLocation] = useState<string>('서울 서초구 (반포동)');

  // Checklist state
  const [checklist, setChecklist] = useState<{ id: string; label: string; checked: boolean }[]>([
    { id: '1', label: '방풍 골프 자켓 (아침 기온차 대비)', checked: true },
    { id: '2', label: '골프공 2슬리브 (코스 벙커 및 해저드 대비)', checked: true },
    { id: '3', label: '나무 롱티 4개 & 숏티 4개', checked: false },
    { id: '4', label: '그린 잔디 보수기 (디봇 수리용 툴)', checked: true },
    { id: '5', label: '자외선 차단 선크림 & 썬패치', checked: false },
    { id: '6', label: '거리측정기 충전 완료 확인', checked: true },
  ]);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    {
      sender: 'ai',
      text: '안녕하세요! AI 골프 비서입니다. 라운딩 예정이신 골프장, 코스 공략법, 실시간 바람과 날씨에 따른 클럽 선택에 대해 무엇이든 질문해주세요.'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  const currentCourse = getGolfCourseById(targetCourseId) || GOLF_COURSES[0];

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const userText = inputQuestion;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputQuestion('');

    setTimeout(() => {
      let reply = '';
      if (userText.includes('공략') || userText.includes('홀')) {
        reply = `${currentCourse.name}의 시그니처 ${currentCourse.signatureHole}은 그린 앞 벙커와 언듈레이션이 특징입니다. 티샷 시 안전하게 중앙 우측을 타겟으로 잡으시고, 그린 공략 시 핀 직접 공략보다는 중앙 안착을 권장합니다.`;
      } else if (userText.includes('바람') || userText.includes('날씨')) {
        reply = `현재 ${currentCourse.region} 지역은 초속 2~3m/s의 미풍이 불고 있습니다. 맞바람 홀에서는 1클럽 길게 잡고 3/4 스윙 펀치샷으로 스핀량을 줄여 탄도를 낮추는 것이 유리합니다.`;
      } else if (userText.includes('그린') || userText.includes('퍼팅')) {
        reply = `${currentCourse.name}은 관리 상태가 우수하여 그린 스피드가 3.0m/s 이상으로 매우 빠릅니다. 내리막 퍼팅 시 볼의 잔라이를 20% 더 보시고, 홀컵을 30cm 지나치지 않도록 거리감에 집중하세요.`;
      } else {
        reply = `${currentCourse.name} 라운딩 준비를 돕겠습니다. ${userLocation}에서 예상 이동시간은 약 50분이며, 티오프 ${teeTime} 기준 최소 1시간 전인 07:30까지 클럽하우스에 도착하시어 스트레칭과 퍼팅 연습을 진행하시는 것을 추천합니다.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-500/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              실시간 AI 맞춤형 골프 캐디
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">AI 골프 비서</h1>
            <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-xl">
              현재 위치 기준 최적 이동경로, 실시간 필드 기상과 바람, 코스 공략법 및 맞춤형 준비물을 완벽하게 서포트합니다.
            </p>
          </div>

          {/* Quick Selectors */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col sm:flex-row gap-2 shrink-0">
            <div>
              <label className="block text-[10px] text-purple-200 mb-0.5">목표 골프장</label>
              <select
                value={targetCourseId}
                onChange={(e) => setTargetCourseId(e.target.value)}
                className="bg-slate-900 text-white text-xs font-bold rounded-xl px-2.5 py-1.5 border border-purple-400/40 focus:outline-none"
              >
                {GOLF_COURSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-purple-200 mb-0.5">티오프 시간</label>
              <input
                type="time"
                value={teeTime}
                onChange={(e) => setTeeTime(e.target.value)}
                className="bg-slate-900 text-white text-xs font-mono font-bold rounded-xl px-2.5 py-1.5 border border-purple-400/40 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Weather & Traffic vs Strategy & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Real-time Weather & Traffic Route */}
        <div className="space-y-6">
          {/* Real-time Weather Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  {currentCourse.name} 실시간 날씨 및 예보
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">기상청 공식 연동</span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div>
                <span className="text-xs text-slate-500">라운딩 기온</span>
                <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">17°C</div>
                <span className="text-[10px] text-emerald-700">쾌적한 온도</span>
              </div>
              <div>
                <span className="text-xs text-slate-500">풍속 및 풍향</span>
                <div className="text-2xl font-black font-mono text-blue-600 mt-0.5">2.2 m/s</div>
                <span className="text-[10px] text-blue-700">북서풍 (미풍)</span>
              </div>
              <div>
                <span className="text-xs text-slate-500">강수 확률</span>
                <div className="text-2xl font-black font-mono text-slate-800 mt-0.5">0%</div>
                <span className="text-[10px] text-slate-500">비 걱정 없음</span>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                시간대별 기상 예보
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100 font-mono">
                  <div className="text-slate-500">08:00</div>
                  <div className="font-bold my-0.5">14°C</div>
                  <div className="text-[10px] text-slate-600">안개 살짝</div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 font-mono">
                  <div className="text-emerald-700 font-bold">11:00</div>
                  <div className="font-bold my-0.5 text-emerald-900">18°C</div>
                  <div className="text-[10px] text-emerald-700">쾌청</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 font-mono">
                  <div className="text-slate-500">14:00</div>
                  <div className="font-bold my-0.5">21°C</div>
                  <div className="text-[10px] text-slate-600">맑음</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 font-mono">
                  <div className="text-slate-500">17:00</div>
                  <div className="font-bold my-0.5">16°C</div>
                  <div className="text-[10px] text-slate-600">선선함</div>
                </div>
              </div>
            </div>
          </div>

          {/* Traffic & Estimated Route */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">이동 경로 및 예상 소요시간</h3>
              </div>
              <span className="text-xs text-slate-500">실시간 교통상황</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Navigation className="w-4 h-4 text-emerald-700" />
                  <span>출발지: {userLocation}</span>
                </div>
                <button
                  onClick={() => {
                    const loc = prompt('출발 위치를 입력해주세요', userLocation);
                    if (loc) setUserLocation(loc);
                  }}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  변경
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500">편도 이동 거리</span>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                    42.8 km
                  </div>
                  <span className="text-[11px] text-slate-500">경부고속도로 이용</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500">예상 소요시간</span>
                  <div className="text-xl font-bold font-mono text-emerald-800 mt-0.5">
                    52분 소요
                  </div>
                  <span className="text-[11px] text-emerald-700">정체 없음 (원활)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>권장 출발 시각:</strong> 티오프({teeTime}) 1시간 30분 전인{' '}
                  <span className="font-bold underline">07:00 출발</span>을 권장합니다.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Course Strategy & Attire Checklist */}
        <div className="space-y-6">
          {/* Course & Wind Attack Strategy */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  {currentCourse.name} 공략 포인트
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                난이도 ★ {currentCourse.difficulty}
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                <div className="text-xs font-bold text-emerald-900 mb-1">시그니처 홀 공략</div>
                <div className="text-sm font-semibold text-slate-900">
                  {currentCourse.signatureHole}
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  그린 주변 벙커의 턱이 깊어 핀을 직접 노리는 것보다 그린 중앙을 공략하는 파세이브 전략이 안전합니다.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
                <div className="text-xs font-bold text-blue-900 mb-1">바람에 따른 클럽 피팅 가이드</div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  북서풍 미풍(2.2m/s) 영향으로 아웃코스 3~5번 홀은 뒤바람, 인코스 12~14번 홀은 맞바람이 형성됩니다. 맞바람 시 1클럽 크게 잡고 볼 위치를 볼 반 개 우측에 두어 펀치샷을 구사하세요.
                </p>
              </div>
            </div>
          </div>

          {/* Attire & Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shirt className="w-5 h-5 text-slate-700" />
                <h3 className="text-base font-bold text-slate-900">추천 복장 및 라운딩 체크리스트</h3>
              </div>
              <span className="text-xs text-slate-500">기상 맞춤 권장</span>
            </div>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs transition-colors ${
                    item.checked
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className={item.checked ? 'line-through opacity-75' : 'font-medium'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Golf Assistant Chat Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">AI 골프 비서에게 질문하기</h3>
            <p className="text-xs text-slate-500">
              코스 공략법, 잔디 관리, 날씨 대응 등 궁금한 점을 입력하세요.
            </p>
          </div>
        </div>

        {/* Message history */}
        <div className="space-y-3 max-h-60 overflow-y-auto p-1">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-xs'
                    : 'bg-purple-50 text-slate-800 border border-purple-100 rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="예: 안양CC 7번홀 공략 팁 알려줘, 비 오는 날 퍼팅 비결은?"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Send className="w-4 h-4" />
            전송
          </button>
        </form>
      </div>
    </div>
  );
};
