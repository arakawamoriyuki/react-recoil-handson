import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import CustomHook from './CustomHook';
import * as CustomHookStoreModule from './CustomHookStore';

afterEach(() => cleanup());

describe('CustomHook', () => {
  it('CustomHookが表示される', () => {
    const { asFragment } = render(
      <CustomHook />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('+ボタンが押されるとincrementが呼ばれる', () => {
    const mockIncrement = jest.fn();
    jest.spyOn(CustomHookStoreModule, 'useCounter').mockReturnValueOnce({
      count: 1,
      increment: mockIncrement,
      reset: () => {},
    });

    render(
      <CustomHook />,
    );

    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);

    expect(mockIncrement).toBeCalled();
  });

  it('Resetボタンが押されるとresetが呼ばれる', () => {
    const mockReset = jest.fn();
    jest.spyOn(CustomHookStoreModule, 'useCounter').mockReturnValueOnce({
      count: 1,
      increment: () => {},
      reset: mockReset,
    });

    render(
      <CustomHook />,
    );

    const button = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(button);

    expect(mockReset).toBeCalled();
  });
});
