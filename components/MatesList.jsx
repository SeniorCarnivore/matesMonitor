import React, { Component } from 'react';
import { array, arrayOf, object, func } from 'prop-types';
import styled from 'styled-components';

import Mate from './Mate';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


export default class MatesList extends Component {
  static propTypes = {
    mates: arrayOf(object),
    filter: object,
    callback: func,
    determineMate: func,
    excludedMates: array
  }

  state = {
    mates: this.props.mates
  }

  filterMates = (mates, filter, excludedMates, callback, determineMate) => {
    const keys = filter && Object.keys(filter);
    const activeFilters = keys && keys.filter(key => filter[key]);

    let filteredMates = mates;

    if (activeFilters && activeFilters.length) {
      filteredMates = mates.filter(
        mate => activeFilters.every(filterParam => 
          mate.skills.indexOf(filterParam) >= 0
        )
      );
    }

    if (excludedMates && excludedMates.length) {

      filteredMates = filteredMates.filter(
        mate => excludedMates.every(id =>
          mate.id !== id
        )
      );
    }

    filteredMates = filteredMates.sort((a, b) => a.rating - b.rating);

    return this.parseMates(filteredMates, callback, activeFilters, determineMate);
  }

  parseMates = (mates, callback, activeFilters, determineMate) => (
    mates.map(
      mate => <Mate
                  key={ mate.id }
                  data={ mate }
                  filtered={ activeFilters && activeFilters.length }
                  callback={ callback }
                  determineMate={ determineMate }
                />
    )
  )

  render() {
    const {
      mates,
      filter,
      callback,
      determineMate,
      excludedMates
    } = this.props;

    return (
      <Container>
          { this.filterMates(mates, filter, excludedMates, callback, determineMate) }
      </Container>
    );
  }
};
