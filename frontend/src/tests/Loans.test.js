import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Loans from '../pages/Loans';
import API from '../api';
jest.mock('../api');

describe('Loans Component', () => {
  it('filters and displays loan history', async () => {
    API.get.mockResolvedValue({ data: [{ book: { title: '1984' }, dueDate: new Date(), returnDate: null }] });
    render(<Loans />);
    await waitFor(() => expect(screen.getByText(/1984/i)).toBeInTheDocument());
  });
});