import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export function getAuthPropType() {
  return ImmutablePropTypes.mapContains({
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    username: React.PropTypes.string,
    message: React.PropTypes.string,
    admin: React.PropTypes.bool,
  });
}

export function getDoorPropType() {
  return ImmutablePropTypes.mapContains({
    status: React.PropTypes.string,
    data: ImmutablePropTypes.contains({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      users: ImmutablePropTypes.listOf(React.PropTypes.string),
    }),
  });
}

export function getUserPropType() {
  return ImmutablePropTypes.mapContains({
    status: React.PropTypes.string,
    data: ImmutablePropTypes.contains({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      doors: ImmutablePropTypes.listOf(React.PropTypes.string),
    }),
  });
}

export function getGenericPropType() {
  return ImmutablePropTypes.mapContains({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
  });
}
