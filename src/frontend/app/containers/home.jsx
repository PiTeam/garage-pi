import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';

import { getAuthPropType } from 'proptypes';

export default class Home extends React.Component {
  displayName: 'Home';

  getStyles() {
    return {
      left: {
        float: 'left',
      },
      doorIcon: {
        width: '100%',
        height: '100%',
      },
      right: {
        float: 'right',
      },
      logo: {
        marginTop: '50%',
      },
      bottomButtons: {
        position: 'absolute',
        bottom: '1em',
        left: '1em',
        right: '1em',
      },
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <h1 style={styles.logo}>{'Logo needed here!'}</h1>
        {this.props.auth.get('status') === 'success' &&
          <div style={styles.bottomButtons}>
            <Link to="/door">
              <RaisedButton
                label="Open doors"
                primary
                style={styles.left}
              />
            </Link>
            {this.props.auth.get('admin') &&
              <Link to="/manage">
                <RaisedButton
                  label="Admin zone"
                  secondary
                  style={styles.right}
                />
              </Link>
            }
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  auth: getAuthPropType(),
};
