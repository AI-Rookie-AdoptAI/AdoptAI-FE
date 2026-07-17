/** 문자열(예: UUID)로부터 0~length-1 사이의 안정적인 인덱스를 만들어요. */
export function hashIndex(id: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
}
