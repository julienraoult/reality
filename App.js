import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// https://raw.githubusercontent.com/julienraoult/reality/main/index2.html?token=ATPNPXXQNRTR5J6PUPXHGLDBFO6JE

// https://snack.expo.dev/@shahidcodes/webview-get-user-media-test-android

export default function App() {

    const [showWebView, setShowWebView] = React.useState(false);

    const fn = async () => {
	const { status } = await Permissions.askAsync(Permissions.CAMERA);
	console.log(status);
	setShowWebView(true)
    };

    fn()
    
    if (!showWebView) {
	console.log("showWebView false");
	 return (
		 <View>
		 <Text>Grant Permission first</Text>
		 </View>
    );
    }
    if (showWebView) {
	console.log("showWebView true")
    }
    
    return (
	    <WebView
	useWebKit
	style={styles.container}
	allowsInlineMediaPlayback
	mediaPlaybackRequiresUserAction={false}
	startInLoadingState
        scalesPageToFit
        javaScriptEnabledAndroid={true}
        javaScriptEnabled={true} 
	source={{ uri: 'https://ebbe-213-245-46-227.ngrok.io' }}
	    />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
