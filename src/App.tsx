import { AppRoutes } from './routes/AppRoutes'
import { DemoProvider } from './state/DemoProvider'
import { SessionProvider } from './state/SessionProvider'
import { ToastProvider } from './state/ToastProvider'

/** Provider와 라우트 연결만 담당한다. 화면 UI와 더미데이터는 두지 않는다. */
export default function App() {
  return (
    <DemoProvider>
      <SessionProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </SessionProvider>
    </DemoProvider>
  )
}
