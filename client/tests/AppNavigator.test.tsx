import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import App from '../App';

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

  test('List item go to Manage Screen edit mode on press', async () => {
    const listItem = await wrapper.findByText('A pair of shoes');
    fireEvent(listItem, 'press');
    const editScreen = await wrapper.findByText(/update/i);
    expect(editScreen).toBeTruthy();
  });

  test('Plus icon on press go to Manage Screen add mode', async () => {
    const addIcon = await wrapper.findByTestId('iconButton');
    fireEvent(addIcon, 'press');
    const addScreen = await wrapper.findByText('Add');
    expect(addScreen).toBeTruthy();
  });
});
