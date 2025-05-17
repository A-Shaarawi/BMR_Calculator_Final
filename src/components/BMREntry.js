import React, { useState } from 'react';
import styled from 'styled-components';

const EntryContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};

  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
`;

function BMREntry({ onCalculate, onReset }) {
  const [formData, setFormData] = useState({
    weight: '',
    age: '',
    height: '',
    days: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      ...formData,
      weight: Number(formData.weight),
      age: Number(formData.age),
      height: Number(formData.height),
      days: Number(formData.days)
    });
  };

  const handleReset = () => {
    setFormData({
      weight: '',
      age: '',
      height: '',
      days: '',
      gender: ''
    });
    onReset();
  };

  return (
    <EntryContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="number"
          name="weight"
          placeholder="Enter weight (kg)"
          value={formData.weight}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="height"
          placeholder="Enter height (cm)"
          value={formData.height}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="days"
          placeholder="Days of training per week (0-7)"
          value={formData.days}
          onChange={handleInputChange}
          min="0"
          max="7"
          required
        />
        
        <RadioGroup>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
              required
            />
            Female
          </label>
        </RadioGroup>

        <ButtonGroup>
          <Button type="submit" primary>Calculate</Button>
          <Button type="button" onClick={handleReset}>Reset</Button>
        </ButtonGroup>
      </form>
    </EntryContainer>
  );
}

export default BMREntry; 