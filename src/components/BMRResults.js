import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #1a73e8;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: #333;
`;

const Value = styled.span`
  color: #1a73e8;
  font-weight: 600;
`;

const HighlightValue = styled(Value)`
  font-size: 1.2rem;
  color: #1557b0;
`;

function BMRResults({ data }) {
  return (
    <ResultsContainer>
      <Title>Your Results</Title>
      <ResultRow>
        <Label>Basal Metabolic Rate (BMR)</Label>
        <HighlightValue>{data.bmr} calories/day</HighlightValue>
      </ResultRow>
      <ResultRow>
        <Label>Daily Calorie Needs</Label>
        <HighlightValue>{data.dailyCalories} calories/day</HighlightValue>
      </ResultRow>
      <ResultRow>
        <Label>Weight</Label>
        <Value>{data.weight} kg</Value>
      </ResultRow>
      <ResultRow>
        <Label>Age</Label>
        <Value>{data.age} years</Value>
      </ResultRow>
      <ResultRow>
        <Label>Height</Label>
        <Value>{data.height} cm</Value>
      </ResultRow>
      <ResultRow>
        <Label>Activity Level</Label>
        <Value>
          {data.days === '0' ? 'Sedentary' :
           data.days === '1-2' ? 'Light' :
           data.days === '3-4' ? 'Moderate' :
           data.days === '5-6' ? 'Very Active' : 'Extra Active'}
        </Value>
      </ResultRow>
      <ResultRow>
        <Label>Gender</Label>
        <Value>{data.gender === 'male' ? 'Male' : 'Female'}</Value>
      </ResultRow>
    </ResultsContainer>
  );
}

export default BMRResults; 