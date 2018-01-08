import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import styled from 'styled-components';

import Mate from './Mate';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


export default class MatesList extends Component {
  static propTypes = {
    mates: arrayOf(object),
    filter: object
  }
  
  static defaultProps = {
    mates: [],
    filter: null
  }

  state = {
    mates: this.props.mates
  }

  filterMates = (mates, filter, callback) => {
    const keys = filter && Object.keys(filter);
    const activeFilters = keys && keys.filter(key => filter[key]);

    let filteredMates = mates;

    if (activeFilters && activeFilters.length) {
      filteredMates = mates.filter(
        mate => activeFilters.every(filter => 
          mate.skills.indexOf(filter) >= 0
        )
      );
    }

    return this.parseMates(filteredMates, callback);
  }

  parseMates = (mates, callback) => (
    mates.map(
      (mate) => <Mate
                  key={ mate.id }
                  data={ mate }
                  callback={ callback }
                />
    )
  )

  render() {
    const {
      mates,
      filter,
      callback
    } = this.props;

    return (
      <Container>
        { this.filterMates(mates, filter, callback) }
      </Container>
    );
  }
};
