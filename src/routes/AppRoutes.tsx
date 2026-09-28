import { Route, Routes } from 'react-router'
import { AuthLayout } from '../layouts/AuthLayout'
import { DetailLayout } from '../layouts/DetailLayout'
import { MainLayout } from '../layouts/MainLayout'
import { ShowcaseLayout } from '../layouts/ShowcaseLayout'
import { AuthMethodPage } from '../pages/auth/AuthMethodPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { WelcomePage } from '../pages/auth/WelcomePage'
import { DemoPage } from '../pages/demo/DemoPage'
import { HomePage } from '../pages/home/HomePage'
import { ConnectionSelectPage } from '../pages/story/ConnectionSelectPage'
import { StoryDetailPage } from '../pages/story/StoryDetailPage'
import { OnboardingPage } from '../pages/onboarding/OnboardingPage'
import { NotFoundPage } from '../pages/error/NotFoundPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { EntryRedirect } from './EntryRedirect'
import { GuestOnly } from './guards/GuestOnly'
import { RequireAuth } from './guards/RequireAuth'
import { RequireSetup } from './guards/RequireSetup'

/**
 * 화면·URL 대응표: 구현요청서 7-3.
 * ShowcaseLayout(기기 목업)이 모든 화면을 한 번만 감싼다. PC·모바일 전환은 이 트리를 다시 만들지 않는다.
 * 레이아웃 모양(Auth/Main/Detail)과 접근 조건(가드)은 따로 관리한다.
 *
 * PlaceholderPage는 2단계(공통 구조) 확인용 임시 화면이다. 3~4단계에서 실제 페이지로 하나씩 교체한다.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ShowcaseLayout />}>
        <Route index element={<EntryRedirect />} />
        <Route path="demo" element={<DemoPage />} />

        <Route element={<GuestOnly />}>
          <Route element={<AuthLayout />}>
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="auth" element={<AuthMethodPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Route>

        <Route element={<RequireSetup />}>
          <Route element={<AuthLayout />}>
            <Route path="onboarding/:step" element={<OnboardingPage />} />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="explore" element={<PlaceholderPage title="탐색" figma="2024:778" />} />
            <Route path="search" element={<PlaceholderPage title="통합 검색 결과" figma="2049:769" />} />
            <Route path="map" element={<PlaceholderPage title="나의 역사 지도" figma="2024:878" />} />
            <Route path="map/badges" element={<PlaceholderPage title="배지" figma="2024:849" />} />
            <Route path="library" element={<PlaceholderPage title="보관함" figma="2049:895" />} />
          </Route>
          <Route element={<DetailLayout />}>
            <Route path="stories/:storyId" element={<StoryDetailPage />} />
            <Route path="stories/:storyId/connections" element={<ConnectionSelectPage />} />
            <Route path="profile" element={<PlaceholderPage title="프로필" figma="2034:1121" />} />
            <Route path="pass" element={<PlaceholderPage title="오딧 패스 소개" figma="2034:1181" />} />
            <Route path="pass/plan" element={<PlaceholderPage title="요금제 선택" figma="2034:1228 · 2034:1259" />} />
            <Route path="pass/complete" element={<PlaceholderPage title="패스 완료" figma="2034:1290" />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
