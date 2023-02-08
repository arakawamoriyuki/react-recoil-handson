import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { state, useCount, useReset, useIncrement } from './RecoilCustomHookStore';

describe('useCount', () => {
  it('現在のcount値を返す', () => {
    const { result } = renderRecoilHook(useCount);
    expect(result.current).toBe(0);
  });
});

describe('useIncrement', () => {
  it('countを +1 する', () => {
    const { result } = renderRecoilHook(() => {
      const count = useCount();
      const increment = useIncrement();
      return { count, increment };
    });
    act(() => { result.current.increment() });
    expect(result.current.count).toBe(1);
  });
});

describe('useReset', () => {
  it('countを 0 にする', () => {
    const { result } = renderRecoilHook(() => {
      const count = useCount();
      const reset = useReset();
      return { count, reset };
    }, {
      states: [{ recoilState: state, initialValue: 1 }],
    });
    expect(result.current.count).toBe(1);
    act(() => { result.current.reset() });
    expect(result.current.count).toBe(0);
  });
});
