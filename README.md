# JoyFeed
JoyFeed is a browser extension that analyzes human emotions using machine learning and filters negative posts on unhappy users' social feed based on its sentimental value. Built during AngelHack San Francisco 2016 by [Chris Wong](http://www.chriswong.tv) & [Cyrus Goh](http://www.lovincyrus.com), it won HPE’s Haven OnDemand Challenge for the “most innovative cognitive computing solution to augment human intelligence using the HPE Haven OnDemand natural language processing, machine learning, and predictive analytics APIs.”

## Structure
- All extension code is located in the ”extension” folder.
- All resources (icons, training data, parser etc.) are located in the ”resources” folder.

## APIs Used
* [HPE Haven OnDemand](https://www.havenondemand.com/)
 * [Train Prediction API](https://dev.havenondemand.com/apis/trainpredictor)
 * [Predict API](https://dev.havenondemand.com/apis/predict)
 * [Sentiment Analysis API](https://dev.havenondemand.com/apis/analyzesentiment)
* [Microsoft Cognitive Services’ Emotion API](https://www.microsoft.com/cognitive-services/en-us/emotion-api)
* [Imgur API](https://api.imgur.com/)

## How To Use
### Pre-Installation Instructions
As JoyFeed utilizes the APIs listed above to function, you are required to sign up for each service in order to obtain an API key for all of them.

1. Clone or download [JoyFeed’s repository](https://github.com/chriswongtv/joyfeed).
2. Navigate to [HPE Haven OnDemand’s sign up page](https://www.havenondemand.com/signup.html) and sign up for an account.
3. Navigate to [HPE Haven OnDemand’s API keys page](https://www.havenondemand.com/account/api-keys.html) and copy the API key.
4. Open <code>extension/popup.js</code> in your favorite text editor and replace <code>YOUR_HAVEN_API_KEY</code> with the API key copied in the previous step.
5. Navigate to [Microsoft Cognitive Services’ subscription page](https://www.microsoft.com/cognitive-services/en-US/subscriptions). You should be prompted to sign in. Once you sign in, scroll down until you see “Emotion - Preview”. Click “Show” to see the API key and copy the key down.
6. In the same <code>popup.js</code> file as step 3, replace <code>YOUR_MICROSOFT_API_KEY</code> with the API key copied in the previous step.
7. Navigate to [Imgur’s application registration page](https://api.imgur.com/oauth2/addclient). You should be prompted to sign in. Once you sign in, use any name to register your application and fill the “Authorization callback URL” with “https://imgur.com” without quotes. 
8. After the registration, navigate to your “[Created Apps](https://imgur.com/account/settings/apps)” page and you should see your newly created app listed. Copy the “Client ID”.
9. In the same <code>popup.js</code> file as step 3, replace <code>YOUR_IMGUR_API_KEY</code> with the Client ID copied in the previous step.
10. Save <code>popup.js</code>.

### Training HPE Haven OnDemand’s Prediction Model
In order to use machine learning to predict how the user is feeling, we have to train the prediction model first. Since Haven OnDemand’s Predict API can only access models trained on the same account, you will have to train it manually using the dataset we provide.

1. Navigate to [HPE Haven OnDemand’s Train Prediction’s “Try It” page](https://dev.havenondemand.com/apis/trainpredictor#try). Sign in to your account if you haven’t done so.
2. Under “Parameters - file”, click “Select File”. Navigate to your JoyFeed folder and select <code>resources/train.csv</code>.
3. Under “prediction_field”, enter “Emotion” (case-sensitive).
4. Under “service_name”, enter “joyfeed” (case-sensitive).
5. Click the green “Try It” button on the lower right corner.
6. Wait for the response. It should say “Ready” when it has done training the model.

### Installing The Chrome Extension
1. Navigate to [Chrome’s Extensions page](chrome://extensions/).
2. Check “Developer mode” on the top right corner.
3. Click the “Load unpacked extension…” button. Select the JoyFeed folder that you have downloaded, and it should appear in the list of extensions.
4. JoyFeed’s green icon should appear on the row of extensions next to the address bar.
5. Right click JoyFeed’s green icon and select “Options”. In order to use JoyFeed, you have to grant JoyFeed access to your webcam.

### Using JoyFeed
1. Navigate to [Twitter](https://www.twitter.com).
2. Sign in if you’re not logged in.
3. Click on JoyFeed’s green icon.
4. Perform some positive/neutral/negative facial expression and click on the white “JoyFeed” button. A white, half-transparent layer will appear over your Twitter timeline.
5. Leave the popup window open until the half-transparent layer is gone. This should take some time, probably up to a minute or two.
6. Once the layer has disappeared, you can now close the popup window. You should see the positive tweets highlighted in green and negative tweets highlighted in red. The unhighlighted tweets are determined as neutral.
7. If you would like to hide the negative tweets, you can click on JoyFeed’s extension to open up the popup window again and click on the “Hide filtered tweets” button. All the tweets highlighted in red will disappear.

## Other Information
- Photos are uploaded using the Imgur API and will be public. We do not store nor collect any of your photos.
- We do not collect, store nor access any browsing activity.
- Your Twitter timeline’s tweets are sent directly to HPE Haven OnDemand’s Sentiment Analysis to be processed. We do not store nor collect any of your tweets.
- Please refer to HPE’s [Terms of Service](https://www.havenondemand.com/docs/eula.html) and [Privacy Statement](https://www.hpe.com/us/en/legal/privacy.html) for the use of Train Prediction API, Predict API and Sentiment Analysis API.
- Please refer to Imgur’s [Terms of Service](http://imgur.com/tos) and [Privacy Policy](http://imgur.com/privacy) for the use of Imgur’s API.
- Please refer to Microsoft Cognitive Services’ [Terms](https://go.microsoft.com/fwlink/?LinkId=533207) and [Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement) for the use of Emotion API.