import 'meteor-client';

export class User {

  static getDisplayName(user: User) {
    if (!user) {
      return 'Not Logged In';
    }
    if (user.username)
      return user.username;
    if (user.emails && user.emails.length > 0)
      return user.emails[0].address;
    return user._id;
  }

  static defaultAvatarUrl() {
    return Meteor.absoluteUrl('default-avatar.png');
  };


  static getAvatarURL(user:User, size:string="thumb"):string {
    if (!user) {
      return User.defaultAvatarUrl();
    }
    let profile = user.profile;
    if (!profile)
      return User.defaultAvatarUrl();

    let file = profile['avatar-' + size];
    if (!file) {
      file = profile['avatar-medium'];
    }
    if (!file) {
      return User.defaultAvatarUrl();
    }
    return file;
  }

  // Get the initials of the user (from https://github.com/meteor-utilities/avatar/)

  static getInitials(user:User):string {
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



  _id: string;
  username: string;
  emails: {
    address:string;
    verified?:boolean;
  }[];
  profile: {
    name?: string;
    "avatar-original"?: string;
    "avatar-medium"?: string;
    "avatar-thumb"?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Date;
    gender?: string;
    organization?: string;
    website?: string;
    bio?: string;
    country?: {
      name?: string;
      code?: string;
    }
  };
  // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
  registered_emails: any;
  createdAt: Date;
  services: any;
  roles:string[];
  heartbeat: Date;
  presence: string;
}
