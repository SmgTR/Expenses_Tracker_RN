import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';

import { store } from '../src/redux/store';
import { getFormattedDate } from '@/utils/date';

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
    await wrapper.findByText('Recent Expenses');
  });

  test('Switch to all expenses tab', async () => {
    const navButton = await wrapper.findByText('All');
    fireEvent(navButton, 'press');
    await wrapper.findByText('All Expenses');
  });

  test('Switch back to recent tab', async () => {
    const allButton = await wrapper.findByText('All');
    fireEvent(allButton, 'press');
    const recentButton = await wrapper.findByText('Recent');
    fireEvent(recentButton, 'press');
    await wrapper.findByText('Recent Expenses');
  });
  //Current: Recent Tab
  test('Plus icon on press go to Manage Screen add mode', async () => {
    const addIcon = await wrapper.findByTestId('addButton');
    fireEvent(addIcon, 'press');
    await wrapper.findByText('Add');
  });

  test('Add list item', async () => {
    const addIcon = await wrapper.findByTestId(/addButton/i);
    fireEvent(addIcon, 'press');

    const descriptionInput = await wrapper.getByTestId('formDescription');
    const dateInput = await wrapper.getByTestId('formDate');
    const amountInput = await wrapper.getByTestId('formAmount');

    const date = getFormattedDate(new Date());

    fireEvent(descriptionInput, 'changeText', 'motorhead cd');
    fireEvent(dateInput, 'changeText', date);
    fireEvent(amountInput, 'changeText', '22');

    const addButton = await wrapper.findByText(/add/i);
    await fireEvent(addButton, 'press');

    await wrapper.findByText(/motorhead cd/i);
    await wrapper.findByText(date.toString());
    await wrapper.findByText('22.00');
  });

  test('Display update screen', async () => {
    const listItem = await wrapper.findByText(/motorhead cd/i);
    fireEvent(listItem, 'press');

    await wrapper.findByText(/update/i);
  });

  test('Update list item', async () => {
    const listItem = await wrapper.findByText(/motorhead cd/i);
    fireEvent(listItem, 'press');

    const descriptionInput = await wrapper.getByTestId('formDescription');
    const dateInput = await wrapper.getByTestId('formDate');
    const amountInput = await wrapper.getByTestId('formAmount');

    const date = getFormattedDate(new Date());

    fireEvent(descriptionInput, 'changeText', 'guns n roses cd');
    fireEvent(dateInput, 'changeText', date);
    fireEvent(amountInput, 'changeText', '22');

    const editButton = await wrapper.findByText(/update/i);
    fireEvent(editButton, 'press');
    await wrapper.findByText(/guns n roses cd/i);
  });

  test('Delete list item', async () => {
    const listItem = await wrapper.findByText(/guns n roses cd/i);
    fireEvent(listItem, 'press');
    const deleteButton = await wrapper.findByTestId('deleteButton');
    fireEvent(deleteButton, 'press');
    expect(wrapper.queryByText(/guns n roses cd/i)).not.toBeTruthy();
  });
});
