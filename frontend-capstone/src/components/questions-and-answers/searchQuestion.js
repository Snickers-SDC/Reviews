import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { searchState } from './qa-atoms';
import { useRecoilState } from 'recoil';

const SearchQuestion = (props) => {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <Form.Group controlId="search">
      <Form.Control
        type="search"
        name="search"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        maxLength={60}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </Form.Group>
  );
};

export default SearchQuestion;
