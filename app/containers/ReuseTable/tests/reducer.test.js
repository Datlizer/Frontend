
import { fromJS } from 'immutable';
import reuseTableReducer from '../reducer';

describe('reuseTableReducer', () => {
  it('returns the initial state', () => {
    expect(reuseTableReducer(undefined, {})).toEqual(fromJS({}));
  });
});
