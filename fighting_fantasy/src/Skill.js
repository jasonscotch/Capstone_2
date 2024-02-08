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
    <div className='rpgui-container framed-golden'>
      {!initialSkillInputDone && (
        <div className='main-game-stats'>
          <label>
            Skill: 
            <input
              type="number"
              value={originalSkill}
              onChange={handleInputChange}
            />
            <button onClick={handleInputSubmit}> > </button>
          </label>
          
        </div>
      )}
      {initialSkillInputDone && (
        <div className='main-game-stats-2'>
          <h2>Skill</h2>
          <h1>{skill}</h1>
          {/* <br></br>
          <p>Original Skill: {originalSkill}</p> */}
          <div>
          <button onClick={handleDecrease} disabled={skill === 0}>-</button>
          <button onClick={handleIncrease} disabled={skill === originalSkill}>+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillSection;
