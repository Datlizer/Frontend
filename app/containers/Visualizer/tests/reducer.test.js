
import { fromJS } from 'immutable';
import visualizerReducer from '../reducer';

describe('visualizerReducer', () => {
  it('returns the initial state', () => {
    expect(visualizerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
