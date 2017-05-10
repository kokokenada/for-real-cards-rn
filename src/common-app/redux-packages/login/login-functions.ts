import { _ } from 'underscore';

import {IUser} from './login-types';
export class LoginFunctions {
  static getDisplayName(user: IUser) {
    if (!user) {
      return 'Not Logged In';
    }
    if (user.username)
      return user.username;
    if (user.emails && user.emails.length > 0)
      return user.emails[0].address;
    return user._id;
  }

  static getAvatarURL(user: IUser, defaultUrl: string, size: string = "thumb"): string {
    if (!user) {
      return defaultUrl;
    }
    let profile = user.profile;
    if (!profile)
      return defaultUrl;

    let file = profile['avatar-' + size];
    if (!file) {
      file = profile['avatar-medium'];
    }
    if (!file) {
      return defaultUrl;
    }
    return file;
  }

  // Get the initials of the user (from https://github.com/meteor-utilities/avatar/)

  static getInitials(user: IUser): string {
    var initials = '';
    var name = '';
    var parts = [];

    if (user && user.profile && user.profile.firstName) {
      initials = user.profile.firstName.charAt(0).toUpperCase();

      if (user.profile.lastName) {
        initials += user.profile.lastName.charAt(0).toUpperCase();
      }
    }
    else {
      if (user && user.profile && user.profile.name) {
        name = user.profile.name;
      }
      else if (user && user.username) {
        name = user.username;
      }

      parts = name.split(' ');
      // Limit getInitials to first and last initial to avoid problems with
      // very long multi-part names (e.g. "Jose Manuel Garcia Galvez")
      initials = _.first(parts).charAt(0).toUpperCase();
      if (parts.length > 1) {
        initials += _.last(parts).charAt(0).toUpperCase();
      }
    }

    return initials;
  }

  static currentUserEmail( user:IUser ):string {
    if (user) {
      if (user.emails && user.emails.length>0) {
        return user.emails[0].address;
      }
    }
    return '';
  }

}

