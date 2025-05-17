import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span`
  font-weight: bold;
  color: #1a73e8;
`;

function BMRResults({ data }) {
  return (
    <ResultsContainer>
      <ResultRow>
        <Label>BMR:</Label>
        <Value>{data.bmr} Calories/Day</Value>
      </ResultRow>
      <ResultRow>
        <Label>Daily Calories:</Label>
        <Value>{data.dailyCalories} Calories/Day</Value>
      </ResultRow>
      <ResultRow>
        <Label>Weight:</Label>
        <Value>{data.weight} kg</Value>
      </ResultRow>
      <ResultRow>
        <Label>Age:</Label>
        <Value>{data.age} years</Value>
      </ResultRow>
      <ResultRow>
        <Label>Height:</Label>
        <Value>{data.height} cm</Value>
      </ResultRow>
    </ResultsContainer>
  );
}

export default BMRResults; 