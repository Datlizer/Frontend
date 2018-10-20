
import { fromJS } from 'immutable';
import filterReducer from '../reducer';

describe('filterReducer', () => {
  it('returns the initial state', () => {
    expect(filterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
