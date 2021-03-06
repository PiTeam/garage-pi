import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import Paper from 'material-ui/lib/paper';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import { getDoorPropType } from 'proptypes';

const UserDoorList = ({ doors }) => {
  const getStyles = () => ({
    paper: {
      width: '100%',
      textAlign: 'center',
      display: 'inline-block',
    },
    doors: {
      marginBottom: '4em',
    },
    backButton: {
      float: 'left',
    },
    logo: {
      marginTop: '50%',
    },
    bottomButtons: {
      bottom: '1em',
      left: '1em',
      right: '1em',
      position: 'absolute',
    },
    tabs: {
      marginBottom: '4em',
    },
  });

  const getCardTitle = (name) => (
    <CardTitle
      subtitle="Click to open door"
      title={name}
    />
  );

  const styles = getStyles();
  return (
    <div>
      {doors.get('data').size === 0 &&
        <h1 style={styles.logo}>{'No authorized doors'}</h1>
      }
      {doors.get('data').size > 0 &&
        <Tabs style={styles.tabs}>
        {doors.get('data').map((door, i) => (
          <Tab
            key={i}
            label={door.get('name')}
          >
            <Paper
              key={i}
              style={styles.paper}
            >
              <Card>
                <CardMedia
                  overlay={getCardTitle(door.name)}
                >
                  <img alt={door.get('name')} src={door.get('image')} />
                </CardMedia>
              </Card>
            </Paper>
          </Tab>
        ))}
        </Tabs>
      }
      <div style={styles.bottomButtons}>
        <Link to="/">
          <RaisedButton
            label="Back"
            style={styles.backButton}
          />
        </Link>
      </div>
    </div>
  );
};

function mapStateToProps({ doors }) {
  return { doors };
}

export default connect(mapStateToProps)(UserDoorList);

UserDoorList.propTypes = {
  doors: getDoorPropType(),
};
