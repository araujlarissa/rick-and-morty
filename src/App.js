import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

import api from './services/api';

import RadioFilter from './components/RadioFilter';

const typeGender = ['Female', 'Male', 'unknown', 'all'];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function App() {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [gender, setGender] = useState('all');

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const loadCharacters = async () => {
      const { data } = await api.get(`?page=${page}`);
      const { info, results } = data;

      setTotalPages(info.pages);

      for (let i = 0; i < typeGender.length - 1; i++) {
        if (gender === typeGender[i])
          setCharacters(
            results.filter((character) => character.gender === typeGender[i])
          );
      }

      if (gender === 'all') setCharacters(results);
    };

    loadCharacters();
  }, [page, gender]);

  return (
    <div>
      <form>
        <label htmlFor="gender">Gender</label>
        {typeGender.map((type) => (
          <RadioFilter
            name="gender"
            gender={type}
            check={gender}
            action={() => setGender(type)}
          />
        ))}
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

      <div className={classes.root}>
        <Pagination
          count={totalPages}
          variant="outlined"
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
