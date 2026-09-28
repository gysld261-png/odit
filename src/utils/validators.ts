/** 입력값 검증. 데모라 형식만 확인하고 값은 저장하지 않는다(비밀번호 포함). */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

/** 회원가입 비밀번호 규칙 — Figma 04_signup의 실시간 체크 두 줄 */
export function checkPassword(value: string) {
  return {
    hasLetterAndNumber: /[A-Za-z]/.test(value) && /\d/.test(value),
    hasMinLength: value.length >= 8,
  }
}

export function isValidPassword(value: string): boolean {
  const rules = checkPassword(value)
  return rules.hasLetterAndNumber && rules.hasMinLength
}
