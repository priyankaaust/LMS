import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import API from '../api';
jest.mock('../api');

describe('Login Component', () => {
  it('shows error on empty input', async () => {
    render(<Login />);
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/username and password required/i)).toBeInTheDocument();
  });

  it('calls API and handles success', async () => {
    API.post.mockResolvedValue({ data: { token: 'test123' } });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith('/auth/login', { username: 'user', password: 'pass' });
    });
  });
});