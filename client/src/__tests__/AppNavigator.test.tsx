import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import App from '../../App';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('App navigation', () => {
  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  test('Start on recent tab', async () => {
    const recentScreen = await wrapper.findByText('Recent Expenses');
    expect(recentScreen).toBeTruthy();
  });

  test('Switch to all expenses tab', async () => {
    const navButton = await wrapper.findByText('All');
    fireEvent(navButton, 'press');
    const newScreen = await wrapper.findByText('All Expenses');
    expect(newScreen).toBeTruthy();
  });

  test('Switch back to recent tab', async () => {
    const allButton = await wrapper.findByText('All');
    fireEvent(allButton, 'press');
    const recentButton = await wrapper.findByText('Recent');
    fireEvent(recentButton, 'press');
    const recentScreen = await wrapper.findByText('Recent Expenses');
    expect(recentScreen).toBeTruthy();
  });
});
