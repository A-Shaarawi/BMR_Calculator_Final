import React from 'react';
import styled from 'styled-components';
import BMREntry from './components/BMREntry';
import BMRResults from './components/BMRResults';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

function App() {
  const [bmrData, setBmrData] = useState({
    weight: 0,
    age: 0,
    height: 0,
    days: 0,
    gender: '',
    bmr: 0,
    dailyCalories: 0
  });

  const calculateBMR = (data) => {
    let bmr = 0;
    if (data.gender === 'male') {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }

    let activityMultiplier = 1.2; // Sedentary
    if (data.days === 1 || data.days === 2) activityMultiplier = 1.375; // Light
    else if (data.days === 3 || data.days === 4) activityMultiplier = 1.55; // Moderate
    else if (data.days === 5 || data.days === 6) activityMultiplier = 1.725; // Very active
    else if (data.days === 7) activityMultiplier = 1.9; // Extra active

    const dailyCalories = Math.round(bmr * activityMultiplier);

    setBmrData({
      ...data,
      bmr: Math.round(bmr),
      dailyCalories
    });
  };

  const resetCalculator = () => {
    setBmrData({
      weight: 0,
      age: 0,
      height: 0,
      days: 0,
      gender: '',
      bmr: 0,
      dailyCalories: 0
    });
  };

  return (
    <Container>
      <Title>BMR Calculator</Title>
      <BMREntry onCalculate={calculateBMR} onReset={resetCalculator} />
      <BMRResults data={bmrData} />
    </Container>
  );
}

export default App; 