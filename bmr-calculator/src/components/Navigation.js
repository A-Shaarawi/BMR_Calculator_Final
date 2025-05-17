import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #1557b0;
  }
`;

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogin = () => {
    // Clear any existing token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <NavContainer>
      <Button onClick={handleLogin}>
        {token === 'skip_auth' ? 'Login' : 'Switch Account'}
      </Button>
    </NavContainer>
  );
}

export default Navigation; 