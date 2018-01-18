import React, { Component } from 'react';
import { 
  array,
  arrayOf,
  object,
  func,
  number
} from 'prop-types';
import styled from 'styled-components';

import Mate from './Mate';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  max-height: calc(100vh - 129px);
  height: 100%;
  margin: 20px 0 0 20px;
  overflow-y: scroll;
  direction: rtl;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #666;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cacaca;
  }
`;


export default class MatesList extends Component {
  static propTypes = {
    mates: arrayOf(object),
    filter: object,
    callback: func,
    determineMate: func,
    excludedMates: array,
    mateDetails: number
  };

  state = {
    mates: this.props.mates
  };

  filterMates = (mates, filter, excludedMates, callback, determineMate, mateDetails) => {
    const keys = filter && Object.keys(filter);
    const activeFilters = keys && keys.filter(key => filter[key]);

    let filteredMates = mates;

    if (activeFilters && activeFilters.length) {
      filteredMates = mates.filter(
        mate => activeFilters.every(
          filterParam => mate.skills[filterParam]
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

    filteredMates = filteredMates.sort(
      (a, b) => a.rating - b.rating
    );

    return (
      this.parseMates(
        filteredMates,
        callback,
        activeFilters,
        determineMate,
        mateDetails
      )
    );
  }

  parseMates = (mates, callback, activeFilters, determineMate, mateDetails) => (
    mates.map(
      mate => (
        <Mate
          key={ mate.id }
          data={ mate }
          mateDetails={ mateDetails }
          filtered={ activeFilters && activeFilters.length }
          callback={ callback }
          determineMate={ determineMate }
        />
      )
    )
  )

  render() {
    const {
      mates,
      filter,
      callback,
      determineMate,
      excludedMates,
      mateDetails
    } = this.props;

    return (
      <Container>
        { 
          this.filterMates(
            mates,
            filter,
            excludedMates,
            callback,
            determineMate,
            mateDetails
          )
        }
      </Container>
    );
  }
}
