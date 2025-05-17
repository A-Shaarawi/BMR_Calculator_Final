import React, { useState } from 'react';
import styled from 'styled-components';

const EntryContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};

  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
`;

function BMREntry({ data, onCalculate, onReset }) {
  const [formData, setFormData] = useState({
    weight: data.weight || '',
    age: data.age || '',
    height: data.height || '',
    days: data.days || '',
    gender: data.gender || 'male'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <EntryContainer>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
          />
        </InputGroup>

        <InputGroup>
          <Label>Age (years)</Label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
          />
        </InputGroup>

        <InputGroup>
          <Label>Height (cm)</Label>
          <Input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="0"
          />
        </InputGroup>

        <InputGroup>
          <Label>Days of Training per Week</Label>
          <Select name="days" value={formData.days} onChange={handleChange} required>
            <option value="">Select days</option>
            <option value="0">0 days (Sedentary)</option>
            <option value="1-2">1-2 days (Light)</option>
            <option value="3-4">3-4 days (Moderate)</option>
            <option value="5-6">5-6 days (Very Active)</option>
            <option value="7">7 days (Extra Active)</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Gender</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </RadioLabel>
          </RadioGroup>
        </InputGroup>

        <ButtonGroup>
          <Button type="submit" primary>Calculate BMR</Button>
          <Button type="button" onClick={onReset}>Reset</Button>
        </ButtonGroup>
      </Form>
    </EntryContainer>
  );
}

export default BMREntry; 