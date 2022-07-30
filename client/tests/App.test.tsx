import { render, fireEvent, RenderAPI, waitFor, act } from '@testing-library/react-native';
import axios from 'axios';

import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

import { getFormattedDate } from '@/utils/date';

import App from '../App';
import { deleteExpense } from '@/redux/slices/expenses-slice';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App navigation and list actions', () => {
  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('login user', async () => {
    const emailInput = await wrapper.findByTestId('loginEmail');
    const passwordInput = await wrapper.findByTestId('loginPassword');

    fireEvent(emailInput, 'changeText', 'john@doe.com');
    fireEvent(passwordInput, 'changeText', 'Password123@');

    const loginButton = await wrapper.findByTestId('loginButton');
    await mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'simpleToken'
      }
    });
    await fireEvent(loginButton, 'press');
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
    const dateToday = getFormattedDate(new Date());

    await mockedAxios.post.mockResolvedValueOnce({
      data: {
        newExpense: {
          id: 1,
          description: 'motorhead cd',
          amount: 22,
          date: dateToday
        }
      }
    });

    const addIcon = await wrapper.findByTestId(/addButton/i);
    fireEvent(addIcon, 'press');

    const descriptionInput = await wrapper.findByTestId('formDescription');
    const dateInput = await wrapper.findByTestId('formDate');
    const amountInput = await wrapper.findByTestId('formAmount');

    fireEvent(descriptionInput, 'changeText', 'motorhead cd');
    fireEvent(dateInput, 'changeText', dateToday);
    fireEvent(amountInput, 'changeText', '22');

    const addButton = await wrapper.findByText(/add/i);
    await fireEvent(addButton, 'press');

    await wrapper.findByText(/motorhead cd/i);
    await wrapper.findByText(dateToday);
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

    const descriptionInput = await wrapper.findByTestId('formDescription');
    const dateInput = await wrapper.findByTestId('formDate');
    const amountInput = await wrapper.findByTestId('formAmount');

    const date = getFormattedDate(new Date());

    fireEvent(descriptionInput, 'changeText', 'guns n roses cd');
    fireEvent(dateInput, 'changeText', date);
    fireEvent(amountInput, 'changeText', '22');

    const editButton = await wrapper.findByText(/update/i);
    await mockedAxios.put.mockResolvedValueOnce({
      data: {
        editedExpense: {
          id: 1,
          description: 'guns n roses cd',
          amount: 22,
          date
        }
      }
    });
    fireEvent(editButton, 'press');

    await wrapper.findByText(/guns n roses cd/i);
  });

  test('Delete list item', async () => {
    const listItem = await wrapper.findByText(/guns n roses cd/i);
    fireEvent(listItem, 'press');
    const deleteButton = await wrapper.findByTestId('deleteButton');
    await waitFor(() => {
      mockedAxios.delete.mockResolvedValueOnce(store.dispatch(deleteExpense(1)));
      fireEvent(deleteButton, 'press');
    });
    const text = wrapper.queryByText(/guns n roses cd/i);
    expect(text).toBeNull();
  });
});
