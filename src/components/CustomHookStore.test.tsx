import { renderHook, act } from '@testing-library/react';
import { useCounter } from './CustomHookStore';

describe('useCounter', () => {
  describe('count', () => {
    it('現在のcount値を返す', () => {
      const { result } = renderHook(() => useCounter(0));
      expect(result.current.count).toBe(0);
    });
  });

  describe('increment', () => {
    it('countを +1 する', () => {
      const { result } = renderHook(() => useCounter(0));
      act(() => { result.current.increment() });
      expect(result.current.count).toBe(1);
    });
  });

  describe('reset', () => {
    it('countを 0 にする', () => {
      const { result } = renderHook(() => useCounter(2));
      act(() => { result.current.reset() });
      expect(result.current.count).toBe(0);
    });
  });
});
