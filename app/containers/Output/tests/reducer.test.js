
import { fromJS } from 'immutable';
import outputReducer from '../reducer';

describe('outputReducer', () => {
  it('returns the initial state', () => {
    expect(outputReducer(undefined, {})).toEqual(fromJS({}));
  });
});
