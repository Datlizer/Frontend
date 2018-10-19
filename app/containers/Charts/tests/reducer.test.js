
import { fromJS } from 'immutable';
import chartsReducer from '../reducer';

describe('chartsReducer', () => {
  it('returns the initial state', () => {
    expect(chartsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
