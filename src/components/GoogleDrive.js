import React, { Component } from 'react';
import googleApi from '../google-api-loader';
import Button from 'material-ui/Button';

class GoogleDrive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      files: []
    };
  }

  updateSigninStatus = async isSignedIn => {
    const nextState = {
      signedIn: isSignedIn
    };

    if(isSignedIn) {
      const gapi = await googleApi.get();
      const response = await gapi.client.drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)'
      });
      nextState.files = response.result.files;
    }

    this.setState(nextState);
  };

  handleAuthClick = () => {
    googleApi.get().then(gapi => gapi.auth2.getAuthInstance().signIn());
  };

  handleSignoutClick = () => {
    googleApi.get().then(gapi => gapi.auth2.getAuthInstance().signOut());
  };

  componentDidMount() {
    googleApi.get().then(gapi => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          clientId: '604355556990-au1prkndikjjd3ntqujmvp2blgg7954s.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
        }).then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Google Drive</h1>
        {!this.state.signedIn &&
          <Button onClick={this.handleAuthClick}>Authorize</Button>
        }
        {this.state.signedIn &&
          <Button onClick={this.handleSignoutClick}>Sign Out</Button>
        }
        <ul>
          {this.state.files.map(file => (
            <li key={file.id}>{file.name} ({file.id})</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GoogleDrive;
