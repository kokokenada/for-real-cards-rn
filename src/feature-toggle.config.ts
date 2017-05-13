import { IFeatureToggleConfigSet } from 'common-app';

export const FEATURE_TOGGLE_USE_FIREBASE = 'firebase';

// Beware that the initial settings might be overridden by redux state persistence
export const featureToggleConfigs: IFeatureToggleConfigSet = {
  [FEATURE_TOGGLE_USE_FIREBASE]: {
    setting: true,
    description: 'True if using firebase, false if meteor.  Development switch only'
    // To turn this on off and use Meteor, you must also:
    // add npm install     "meteor-node-stubs": "0.2.6"
    // edit src/redux-package.ts to import meteor plugins
    // rebuild meteor client: npm run meteor-client-bundle
  }
};
