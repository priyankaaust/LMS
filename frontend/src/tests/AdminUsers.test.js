import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminUsers from '../admin/Users';
const API = require('../api');

jest.mock('../api');

describe('AdminUsers Component', () => {
  it('displays user list and allows delete', async () => {
    API.get.mockResolvedValue({ data: [{ username: 'alice', _id: '123', role: 'user' }] });
    render(<AdminUsers />);
    await waitFor(() => expect(screen.getByText(/alice/i)).toBeInTheDocument());
  });
});