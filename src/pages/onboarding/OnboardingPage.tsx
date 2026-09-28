import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthScreen } from '../../components/common/AuthScreen'
import { Button } from '../../components/common/Button'
import { MAX_INTERESTS } from '../../data/common/interests'
import { useSession } from '../../hooks/useDemo'
import { useToast } from '../../hooks/useToast'
import { paths, type OnboardingStep } from '../../routes/paths'
import type { InterestId } from '../../types/demo'
import { NotFoundPage } from '../error/NotFoundPage'
import styles from './OnboardingPage.module.css'
import { StepDiscover, StepInterests, StepMap } from './OnboardingSteps'

function parseStep(value: string | undefined): OnboardingStep | null {
  return value === '1' || value === '2' || value === '3' ? (Number(value) as OnboardingStep) : null
}

/**
 * /onboarding/:step — 온보딩 3단계 (Figma 05_discover · 06_map · 07_interest).
 * 세 단계가 같은 컴포넌트라 단계를 오가도 관심사 선택이 유지된다.
 * 시작하기를 누르면 관심사를 계정에 저장(profileCompleted)하고 홈으로 간다.
 */
export function OnboardingPage() {
  const step = parseStep(useParams().step)
  const navigate = useNavigate()
  const { completeSetup } = useSession()
  const { showToast } = useToast()
  const [selected, setSelected] = useState<InterestId[]>([])

  if (step === null) return <NotFoundPage />

  const toggle = (id: InterestId) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id)
      if (prev.length >= MAX_INTERESTS) {
        showToast(`관심사는 최대 ${MAX_INTERESTS}개까지 고를 수 있어요.`)
        return prev
      }
      return [...prev, id]
    })
  }

  const next = () => {
    if (step < 3) {
      navigate(paths.onboarding((step + 1) as OnboardingStep))
      return
    }
    completeSetup(selected)
    navigate(paths.home, { replace: true })
  }

  return (
    <AuthScreen
      gradientStop="40%"
      footerSpacing="tight"
      footer={
        <Button size="cta" onClick={next} disabled={step === 3 && selected.length === 0}>
          {step === 3 ? '시작하기' : '다음'}
        </Button>
      }
    >
      <ol className={styles.progress} aria-label={`온보딩 ${step} / 3단계`}>
        {[1, 2, 3].map((index) => (
          <li key={index} data-done={index <= step} />
        ))}
      </ol>
      {step === 1 && <StepDiscover />}
      {step === 2 && <StepMap />}
      {step === 3 && <StepInterests selected={selected} onToggle={toggle} />}
    </AuthScreen>
  )
}
