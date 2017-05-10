import { Observable } from 'rxjs';
import { FeatureToggleActions } from './feature-toggle-actions';
import { ToggleRouter } from './feature-toggle-router';
import {ReduxPackageCombiner} from "../../redux-package";
import {FeatureTogglePackage} from "./feature-toggle-package";

describe('toggle router', () => {
  describe('getStateFromConfig(config)', () => {
    it('returns the toggles state from a config object', () => {
      const configs = {
        'feature1': {setting: false},
        'feature2': {setting: true},
        'cta': {setting: 'contact'}
      };

      const state = ToggleRouter.getStateFromConfig(configs);

      expect(state).toEqual({
        'feature1': false,
        'feature2': true,
        'cta': 'contact'
      });
    });
  });

  describe('router operations', () => {
    let toggleSetting$: Observable<any>;
    let toggleRouter: ToggleRouter;
//    const watched = (newValue) => {};
    const watched = jest.fn()
    beforeEach(() => {
      let featureToggleActions: FeatureToggleActions = new FeatureToggleActions();
      let featureToggleModule: FeatureTogglePackage = new FeatureTogglePackage();
      ReduxPackageCombiner.reset();
      ReduxPackageCombiner.configure([featureToggleModule], null);
      toggleRouter = new ToggleRouter(ReduxPackageCombiner.getDispatcher(), featureToggleActions);

      const configs = {
        'cta': {setting: 'contact'}
      };
      featureToggleActions.initialize(configs);

      toggleSetting$ = toggleRouter.watch('cta');
      toggleSetting$.subscribe((newValue) => {
        watched(newValue);
      });

      toggleRouter.setFeatureState({cta: 'value'});

    });

    it('should return the value that was set', () => {
      expect(toggleRouter.getFeatureState('cta')).toEqual('value');
    });

    it('watcher should be called', () => {
      expect(watched).toHaveBeenCalledWith('value');
    });


    it('should throw when setting a toggle not defined in config', () => {
      const wrap = () => {
        toggleRouter.setFeatureState({notThere: 'value'});
      };
      expect(wrap).toThrow();
    });
  });

});
