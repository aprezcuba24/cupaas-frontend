import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useProjectList = (q: string, lang: string, setCurrentTeam?: () => Promise<void> , hasCurrentTeam?: boolean) => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<any>(null);
  const [search, setSearch] = useState(q);
  useEffect(() => {
    if (!hasCurrentTeam) {
      setCurrentTeam?.()
    }
  }, [hasCurrentTeam, setCurrentTeam])

  const { push } = useRouter()
  const onChange = useCallback(({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setLoading(true);
        push(value? `/${lang}?q=${value}`: `/${lang}`)
      }, 1000)
    );
  }, [timer, lang, push])
  useEffect(() => {
    setLoading(false)
  }, [q])

  return {
    onChange,
    loading,
    search,
  }
}
