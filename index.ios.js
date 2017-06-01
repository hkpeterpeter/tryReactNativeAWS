/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AWS from 'aws-sdk/dist/aws-sdk-react-native';

AWS.config.update({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000"
});

var creds = new AWS.Credentials({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  sessionToken: 'session'
});
AWS.config.credentials = creds;

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName: table,
    Key:{
        "year": year,
        "title": title
    }
};



export default class tryReactNativeAWS extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      result: null,
    }



  }

  componentDidMount() {

    docClient.get(params, (function(err, data) {
        if (err) {
            //console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            this.setState( { msg: JSON.stringify(err, null, 2)});
        } else {
            //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            this.setState( { msg: JSON.stringify(data, null, 2),
              result: data.Item} );
        }
    }).bind(this) );

  }


  render() {
    const result = this.state.result;
    return (
      <View style={styles.container}>

        {/* <Text style={styles.instructions}>
          {this.state.msg}
        </Text> */}

        {
          result &&
        <View>
          <Text style={styles.instructions}>
              {result.title}
          </Text>
          <Text style={styles.instructions}>
              {result.year}
          </Text>
          <Text style={styles.instructions}>
              {result.info.rating}
          </Text>
          <Text style={styles.instructions}>
              {result.info.plot}
          </Text>



        </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('tryReactNativeAWS', () => tryReactNativeAWS);
