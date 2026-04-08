# 작업 로그: Activity Log 링크 업데이트 (2026-04-08)

## 📝 작업 개요
- **날짜**: 2026-04-08
- **담당**: 서기 (Scribe)
- **요구사항**: `Activity Log` 카드의 연결 링크를 구형 GitHub Pages 링크에서 최신 Vercel 링크(`https://activity-log-six.vercel.app/`)로 변경.

## 🛠️ 수정 내용
### 1. README.md 수정
- 기존: `- **Activity Log:** [https://84ak.github.io/activity_log/](https://84ak.github.io/activity_log/)`
- 수정: `- **Activity Log:** [https://activity-log-six.vercel.app/](https://activity-log-six.vercel.app/)`

### 2. src/app/page.tsx 확인
- `projects` 데이터 객체 내의 `url` 값이 이미 `https://activity-log-six.vercel.app/`로 설정되어 있음을 확인 (변경 불필요).

## ✅ 해결 및 검증
- `README.md` 내의 모든 Activity Log 링크가 최신화되었습니다.
- 프로젝트 전체 소스 코드에서 구형 링크 `84ak.github.io/activity_log/` 가 더 이상 발견되지 않음을 확인했습니다.

## 💡 참고 사항
- 사용자가 직접 요청한 최신 링크로의 통일 작업을 완료하였습니다. 향후 다른 프로젝트 링크 변경 시에도 동일한 방식으로 일관성을 유지해야 합니다.
- **AK Labs 홈페이지 링크 확인**: `https://litt.ly/aklabs` (항상 포함되어야 함)
