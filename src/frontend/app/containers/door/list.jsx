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

export default class UserDoorList extends React.Component {
  displayName: 'UserDoorList';

  getStyles() {
    const styles = {
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
    };

    return styles;
  }

  getCardTitle(name) {
    return (
      <CardTitle
        subtitle="Click to open door"
        title={name}
      />
    );
  }

  render() {
    const styles = this.getStyles();
    return (
      <div>
        {this.props.doors.data.length === 0 &&
          <h1 style={styles.logo}>{'No authorized doors'}</h1>
        }
        {this.props.doors.data.length > 0 &&
          <Tabs style={styles.tabs}>
          {this.props.doors.data.map((door, i) => (
            <Tab
              key={i}
              label={door.name}
            >
              <Paper
                key={i}
                style={styles.paper}
              >
                <a
                  href="#"
                  onClick={this.handleClick}
                >
                  <Card>
                    <CardMedia
                      overlay={this.getCardTitle(door.name)}
                    >
                      <img src={door.image} />
                    </CardMedia>
                  </Card>
                </a>
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
  }
}

function mapStateToProps({ doors }) {
  return { doors };
}

export default connect(mapStateToProps)(UserDoorList);

UserDoorList.propTypes = {
  doors: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
      })
    ),
  }),
};
