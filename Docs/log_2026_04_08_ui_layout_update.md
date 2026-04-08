# 작업 로그: 히어로 및 푸터 레이아웃 개선 (2026-04-08)

## 📝 작업 개요
- **날짜**: 2026-04-08
- **담당**: 서기 (Scribe)
- **요구사항**: 
  1. 히어로 섹션의 "AKLABS 공식 홈페이지" 버튼을 푸터 영역으로 이동.
  2. 히어로 섹션에 카드 메뉴(Bento Grid)로 이동할 수 있는 부드러운 스크롤 버튼 추가.

## 🛠️ 수정 내용

### 1. [page.tsx](file:///Users/byunmose/Desktop/vibe_coding/Tutorial/AI_Study/ai-study-hub/src/app/page.tsx) 수정
- **대상**: Bento Grid 섹션 (`motion.section`)
- **수정**: `id="projects"` 추가하여 스크롤 타겟 지정.
- **대상**: Footer 섹션 (`motion.footer`)
- **수정**: 기존 텍스트 링크 기반의 "AK Labs Universe" 안내를 "AKLABS 공식 홈페이지"라는 명시적인 글로우 버튼(`.glow-button`)으로 교체하여 최상단에 배치.

### 2. [HeroInteractive.tsx](file:///Users/byunmose/Desktop/vibe_coding/Tutorial/AI_Study/ai-study-hub/src/components/HeroInteractive.tsx) 수정
- **수정**: 기존 `<a>` 태그 기반의 공식 홈페이지 링크 제거.
- **추가**: `lucide-react`의 `ChevronDown` 아이콘을 활용한 스크롤 다운 버튼 추가.
- **기능**: 클릭 시 `document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })` 실행.
- **디자인**: 바운스 애니메이션(y축 이동) 및 호버 효과(스케일 및 색상 변환) 적용으로 시각적 완성도 향상.

## ✅ 해결 및 검증
- 히어로 섹션이 더욱 깔끔해졌으며, 사용자가 페이지 하단으로 내려가야 한다는 인지를 명확히 할 수 있게 되었습니다.
- 푸터에 공식 홈페이지 버튼을 배치함으로써 브랜드 연결성을 유지하면서도 메인 콘텐츠의 몰입도를 높였습니다.

## 💡 참고 사항
- 스크롤 버튼은 글래스모피즘 스타일(`backdropFilter: 'blur(10px)'`)을 적용하여 배경의 동적 아이콘들과 조화를 이루도록 설계되었습니다.
