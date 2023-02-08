import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import RecoilCustomHook from './RecoilCustomHook';
import * as RecoilCustomHookStoreModule from './RecoilCustomHookStore';

afterEach(() => cleanup());

describe('RecoilCustomHook', () => {
  it('RecoilCustomHookが表示される', () => {
    const { asFragment } = render(
      <RecoilRoot>
        <RecoilCustomHook />
      </RecoilRoot>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('+ボタンが押されるとincrementが呼ばれる', () => {
    const mockIncrement = jest.fn();
    jest.spyOn(RecoilCustomHookStoreModule, 'useIncrement').mockReturnValueOnce(mockIncrement);

    render(
      <RecoilRoot>
        <RecoilCustomHook />
      </RecoilRoot>,
    );

    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);

    expect(mockIncrement).toBeCalled();
  });

  it('Resetボタンが押されるとresetが呼ばれる', () => {
    const mockReset = jest.fn();
    jest.spyOn(RecoilCustomHookStoreModule, 'useReset').mockReturnValueOnce(mockReset);

    render(
      <RecoilRoot>
        <RecoilCustomHook />
      </RecoilRoot>,
    );

    const button = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(button);

    expect(mockReset).toBeCalled();
  });
});
