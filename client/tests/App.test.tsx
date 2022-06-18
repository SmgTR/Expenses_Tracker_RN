import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';

import { store } from '../src/redux/store';

describe('App navigation and list actions', () => {
  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
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

  test('Plus icon on press go to Manage Screen add mode', async () => {
    const addIcon = await wrapper.findByTestId('addButton');
    fireEvent(addIcon, 'press');
    const addScreen = await wrapper.findByText('Add');
    expect(addScreen).toBeTruthy();
  });

  test('Add list item', async () => {
    const addIcon = await wrapper.findByTestId(/addButton/i);
    fireEvent(addIcon, 'press');
    const addButton = await wrapper.findByText(/add/i);
    fireEvent(addButton, 'press');
    const listItem = await wrapper.findByText(/motorhead/i);
    expect(listItem).toBeTruthy();
  });

  test('Display update screen', async () => {
    const listItem = await wrapper.findByText(/motorhead/i);
    fireEvent(listItem, 'press');
    const editScreen = await wrapper.findByText(/update/i);
    expect(editScreen).toBeTruthy();
  });

  test('Update list item', async () => {
    const listItem = await wrapper.findByText(/motorhead/i);
    fireEvent(listItem, 'press');
    const editButton = await wrapper.findByText(/update/i);
    fireEvent(editButton, 'press');
    const updatedItem = await wrapper.findByText(/appetite for destruction/i);
    expect(updatedItem).toBeTruthy();
  });

  test('Delete list item', async () => {
    const listItem = await wrapper.findByText(/appetite for destruction/i);
    fireEvent(listItem, 'press');
    const deleteButton = await wrapper.findByTestId('deleteButton');
    fireEvent(deleteButton, 'press');
    expect(wrapper.queryByText(/appetite for destruction/i)).not.toBeTruthy();
  });
});
