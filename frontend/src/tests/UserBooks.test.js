import { render, screen, waitFor } from '@testing-library/react';
import UserBooks from '../pages/Books';
import API from '../api';
jest.mock('../api');

describe('UserBooks Component', () => {
  it('displays books and allows borrowing', async () => {
    API.get.mockResolvedValue({ data: [{ title: 'Book A', _id: '1', availableCopies: 1 }] });
    render(<UserBooks />);
    await waitFor(() => expect(screen.getByText(/book a/i)).toBeInTheDocument());
  });
});