import React, { useState } from 'react';

const SkillSection = ({ skill, setSkill, originalSkill, setOriginalSkill, initialSkillInputDone, setInitialSkillInputDone }) => {

  const handleIncrease = () => {
    setSkill(skill + 1);
  };

  const handleDecrease = () => {
    setSkill(skill - 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setOriginalSkill(isNaN(value) ? 0 : value);
  };

  const handleInputSubmit = () => {
    setInitialSkillInputDone(true);
    setSkill(originalSkill);
  };

  return (
    <div>
      {!initialSkillInputDone && (
        <div>
          <label>
            Original Skill: 
            <input
              type="number"
              value={originalSkill}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleInputSubmit}>Submit Initial Skill</button>
        </div>
      )}
      {initialSkillInputDone && (
        <div>
          <h3>Current Skill: {skill}</h3>
          <p>Skill Level: {originalSkill}</p>
          <button onClick={handleIncrease} disabled={skill === originalSkill}>Increase Skill</button>
          <button onClick={handleDecrease} disabled={skill === 0}>Decrease Skill</button>
        </div>
      )}
    </div>
  );
};

export default SkillSection;
