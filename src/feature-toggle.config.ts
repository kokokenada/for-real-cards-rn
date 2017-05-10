import { IFeatureToggleConfigSet } from './common-app';

export const FEATURE_TOGGLE_USE_FIREBASE = 'firebase';

// Beware that the initial settings might be overridden by redux state persistence
export const featureToggleConfigs: IFeatureToggleConfigSet = {
  [FEATURE_TOGGLE_USE_FIREBASE]: {
    setting: true,
    description: 'True if using firebase, false if meteor.  Development switch only'
  }
};
