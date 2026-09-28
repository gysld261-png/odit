import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import clearBg from '../../assets/icons/clear-bg.svg'
import clearIcon from '../../assets/icons/clear.svg'
import eyeIcon from '../../assets/icons/eye.svg'
import okBg from '../../assets/icons/ok-bg.svg'
import okIcon from '../../assets/icons/ok.svg'
import styles from './TextField.module.css'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label: string
  value: string
  onValueChange: (value: string) => void
  /** 56 = 로그인, 52 = 회원가입 (Figma 입력창 높이가 화면마다 다르다) */
  height?: 52 | 56
  /** 입력이 유효할 때 오른쪽에 체크 표시 */
  valid?: boolean
  /** 비밀번호 보기/숨기기 버튼 */
  revealable?: boolean
  /** 입력창 아래 안내·오류 */
  hint?: ReactNode
}

/**
 * 오딧 입력창. 포커스되면 Yellow 500 2px 테두리 + 옅은 링 (Figma input 포커스 상태).
 * 이메일 입력 중에는 지우기 버튼, 유효하면 체크 표시를 보여준다.
 */
export function TextField({
  label,
  value,
  onValueChange,
  height = 56,
  valid = false,
  revealable = false,
  hint,
  type = 'text',
  id,
  ...rest
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const [revealed, setRevealed] = useState(false)
  const inputType = revealable && revealed ? 'text' : type

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={`${styles.label} ui-meta-1l`}>
        {label}
      </label>
      <div className={styles.box} data-height={height}>
        <input
          id={inputId}
          className={styles.input}
          type={inputType}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-describedby={hint ? hintId : undefined}
          {...rest}
        />
        {revealable ? (
          <button
            type="button"
            className={styles.trailing}
            onClick={() => setRevealed((prev) => !prev)}
            aria-label={revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={revealed}
          >
            <img src={eyeIcon} alt="" width={19.6} height={12.1} />
          </button>
        ) : valid ? (
          <span className={styles.trailing} aria-hidden="true">
            <span className={styles.badge}>
              <img src={okBg} alt="" width={20} height={20} />
              <img className={styles.badgeMark} src={okIcon} alt="" width={10} height={8.5} />
            </span>
          </span>
        ) : value.length > 0 && type !== 'password' ? (
          <button type="button" className={`${styles.trailing} ${styles.clear}`} onClick={() => onValueChange('')} aria-label={`${label} 지우기`}>
            <span className={styles.badge}>
              <img src={clearBg} alt="" width={18} height={18} />
              <img className={styles.badgeMark} src={clearIcon} alt="" width={7.6} height={7.6} />
            </span>
          </button>
        ) : null}
      </div>
      {hint && (
        <div id={hintId} className={styles.hint}>
          {hint}
        </div>
      )}
    </div>
  )
}
