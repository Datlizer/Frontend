
import { fromJS } from 'immutable';
import spidermanReducer from '../reducer';

describe('spidermanReducer', () => {
  it('returns the initial state', () => {
    expect(spidermanReducer(undefined, {})).toEqual(fromJS({}));
  });
});
