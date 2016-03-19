import { connect } from 'react-redux';
import { getUserPropType } from 'proptypes';

const UserList = ({ users }) => {
  const getStyles = () => ({
    h1: {
      marginBottom: '1em',
    },
    buttonAdd: {
      position: 'absolute',
      right: '1em',
      bottom: '0em',
    },
    backButton: {
      float: 'left',
    },
    clear: {
      clear: 'both',
    },
    paper: {
      padding: '0 .5em',
      marginBottom: '5em',
    },
    link: {
      textDecoration: 'none',
    },
    bottomButtons: {
      bottom: '1em',
      left: '1em',
      right: '1em',
      position: 'absolute',
    },
  });

  const styles = getStyles();
  return (
    <div>
      <h1 style={styles.h1}>{'Manage users'}</h1>
      <Paper style={styles.paper}>
        <List>
          {users.get('data').map((user, i) => (
            <div key={i}>
              <Link
                style={styles.link}
                to={`/manage/user/${user.get('id')}`}
              >
                <ListItem
                  leftAvatar={<Avatar src={user.get('image')} />}
                  primaryText={user.get('name')}
                  rightIcon={<ActionSettings />}
                />
              </Link>
              {i < users.get('data').size - 1 && <Divider />}
            </div>
            ))
          }
        </List>
      </Paper>

      <div style={styles.bottomButtons}>
        <Link to="/manage/user/add">
          <FloatingActionButton style={styles.buttonAdd}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <br style={styles.clear} />
        <Link
          style={styles.link}
          to="/manage"
        >
          <RaisedButton
            label="Back"
            style={styles.backButton}
          />
        </Link>
      </div>
      <div style={styles.clear} />
    </div>
  );
};

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(UserList);

UserList.propTypes = {
  users: getUserPropType(),
};
