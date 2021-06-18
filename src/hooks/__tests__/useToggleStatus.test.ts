import { act, renderHook } from '@testing-library/react-hooks';
import useToggle from '../useToggle';

describe('useToggle hook', () => {
  it('should return false by default', async () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBeFalsy();
  });

  it('should return true', async () => {
    const { result } = renderHook(() => useToggle());
    const [, open] = result.current;
    act(() => open());
    expect(result.current[0]).toBeTruthy();
  });

  it('should return false', async () => {
    const { result } = renderHook(() => useToggle());
    const [, open, close] = result.current;

    act(() => open());
    expect(result.current[0]).toBeTruthy();

    act(() => close());
    expect(result.current[0]).toBeFalsy();
  });
});
