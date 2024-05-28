import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header';


test('Header Logo Text case ', () => {
  render(<Header />);
  const linkElement = screen.getByText("BookAppointment");
  expect(linkElement).toBeInTheDocument();
});
