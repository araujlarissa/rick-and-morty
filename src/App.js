/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

import api from './services/api';

import RadioFilter from './components/RadioFilter';

function App() {
  const [characters, setCharacters] = useState([]);
  const [gender, setGender] = useState('all');

  useEffect(() => {
    const loadCharacters = async () => {
      const { data } = await api.get('?page=2');

      switch (gender) {
        case 'female':
          setCharacters(
            data.results.filter((character) => character.gender === 'Female')
          );
          break;
        case 'male':
          setCharacters(
            data.results.filter((character) => character.gender === 'Male')
          );
          break;
        case 'unknown':
          setCharacters(
            data.results.filter((character) => character.gender === 'unknown')
          );
          break;
        default:
          setCharacters(data.results);
      }
    };

    loadCharacters();
  }, [gender]);

  return (
    <div>
      <form>
        <label htmlFor="gender">Gender</label>
        <RadioFilter
          name="gender"
          gender="all"
          check={gender}
          action={() => setGender('all')}
        />
        <RadioFilter
          name="gender"
          gender="female"
          check={gender}
          action={() => setGender('female')}
        />
        <RadioFilter
          name="gender"
          gender="male"
          check={gender}
          action={() => setGender('male')}
        />
        <RadioFilter
          name="gender"
          gender="unknown"
          check={gender}
          action={() => setGender('unknown')}
        />
      </form>

      <ul data-testid="character-list">
        {characters.map((character) => (
          <li key={character.id}>
            <strong>{character.name}</strong>
            <span data-testid="gender">{character.gender}</span>
            <span>{character.species}</span>
            <span>{character.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
