import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import BMREntry from './components/BMREntry';
import BMRResults from './components/BMRResults';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import BMRHistory from './components/BMRHistory';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1a73e8;
  text-align: center;
  margin-bottom: 2rem;
`;

const MainContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [bmrData, setBMRData] = useState({
    weight: '',
    age: '',
    height: '',
    days: '',
    gender: 'male',
    bmr: 0,
    dailyCalories: 0
  });

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // setIsAuthenticated(true);
      // Try to get userId and username from localStorage (set after login/signup)
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const parsed = JSON.parse(user);
          setUserId(parsed.id);
          setUsername(parsed.username);
        } catch {
          setUserId(null);
          setUsername(null);
        }
      }
    }
  }, []);

  const calculateBMR = async (data) => {
    const { weight, age, height, days, gender } = data;
    let bmr = 0;

    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultiplier = days === '0' ? 1.2 :
      days === '1-2' ? 1.375 :
      days === '3-4' ? 1.55 :
      days === '5-6' ? 1.725 : 1.9;

    const dailyCalories = Math.round(bmr * activityMultiplier);

    setBMRData({
      ...data,
      bmr: Math.round(bmr),
      dailyCalories
    });

    // Save to backend if userId and username exist (i.e., logged in)
    if (userId && username) {
      try {
        const response = await fetch('http://localhost:5001/api/bmr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            username,
            weight,
            age,
            height,
            days,
            gender,
            bmr: Math.round(bmr),
            dailyCalories
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to save BMR history:', errorData);
        } else {
          setRefreshHistory(r => r + 1);
        }
      } catch (err) {
        console.error('Error saving BMR history:', err);
      }
    } else {
      console.log('Not logged in, not saving BMR history.');
    }
  };

  const resetCalculator = () => {
    setBMRData({
      weight: '',
      age: '',
      height: '',
      days: '',
      gender: 'male',
      bmr: 0,
      dailyCalories: 0
    });
  };

  return (
    <Router>
      <AppContainer>
        <MainContainer>
          <Routes>
            {/* Default route redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected calculator route */}
            <Route
              path="/calculator"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <Title>BMR Calculator</Title>
                    <BMREntry
                      data={bmrData}
                      onCalculate={calculateBMR}
                      onReset={resetCalculator}
                    />
                    {bmrData.bmr > 0 && <BMRResults data={bmrData} />}
                    {/* Show history for logged-in users */}
                    {userId && <BMRHistory userId={userId} refresh={refreshHistory} />}
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
