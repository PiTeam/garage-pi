import { connect } from 'react-redux';

import { getAuthPropType } from 'proptypes';

export const Home = ({ auth }) => {
  const getStyles = () => ({
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
  });

  const styles = getStyles();
  return (
    <div>
      <h1 style={styles.logo}>{'Logo needed here!'}</h1>
      {auth.get('status') === 'success' &&
        <div style={styles.bottomButtons}>
          <Link to="/door">
            <RaisedButton
              label="Open doors"
              primary
              style={styles.left}
            />
          </Link>
          {auth.get('admin') &&
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
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  auth: getAuthPropType(),
};
