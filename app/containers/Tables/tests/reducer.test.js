
import { fromJS } from 'immutable';
import tablesReducer from '../reducer';

describe('tablesReducer', () => {
  it('returns the initial state', () => {
    expect(tablesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
