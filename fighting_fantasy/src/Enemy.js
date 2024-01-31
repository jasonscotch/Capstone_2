import React, { useState } from 'react';

const EnemySection = ({ enemies, combatRound }) => {

    const renderEnemies = () => {
        if (enemies.length === 0 || enemies.some(monster => monster.monster_id === null)) {
            return <p> </p>;
        }

        return enemies.map((monster) => (
            <div key={monster.monster_id}>
                <h3>
                    {monster.monster_name}&emsp;&emsp;&emsp;&emsp;Skill: {monster.skill}&emsp;&emsp;Stamina: {monster.stamina}
                </h3>
            </div>
        ));
    };
    
    return (
        <div>
            <h3>ATTACK!</h3>
            {renderEnemies()}
        </div>
    );
}

export default EnemySection;