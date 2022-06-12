import { render, fireEvent } from '@testing-library/react-native';

import App from '../../App';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('App navigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  test('switch bottom tabs', async () => {
    const navButton = await wrapper.findByText('AllExpenses');

    fireEvent(navButton, 'press');

    const newButton = await wrapper.findByText('Changed');

    expect(newButton).toBeTruthy();
  });
});
