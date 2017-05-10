import { ToggleFactory } from './feature-toggle-initial-state';
import { featureToggleReducer } from './feature-toggle-reducer';
import { FeatureToggleActions } from './feature-toggle-actions';


describe('toggleConfig reducer', () => {
  describe('on TOGGLE_FEATURE', () => {
    it('updates the corresponding toggles in state', () => {
      const prevState = ToggleFactory();
      const action1 = {
        type: FeatureToggleActions.FEATURE_TOGGLE_INITIALIZE,
        payload: {
          feature1: {setting: false},
          feature2: {setting: false},
        },
      };

      const nextState = featureToggleReducer(prevState, action1);

      expect(nextState.toJS()).toEqual({
        feature1: false,
        feature2: false
      });


      const action2 = {
        type: FeatureToggleActions.TOGGLE_FEATURE,
        payload: {
          feature2: true,
        },
      };

      const nextState2 = featureToggleReducer(nextState, action2).toJS();

      expect(nextState2).toEqual({
        feature1: false,
        feature2: true
      });
    });
  });
});
