# What is this
This is a Youtube shoutout wall. This was heavily inspired by https://github.com/detvnk/youtubeShoutoutWall and is fully written by me. The original wall has a lot of problem with its API and its no longer supported or maintained by the owner.

# Disclaimer
I'm not responsible for any bans or strikes that are caused by using this wall. any practices that are against the [Youtube Community Guidelines](https://support.google.com/youtube/answer/2802032?hl=en-GB) such as sub4sub can result in strikes.

# How to setup

1. Download and extract this repository

2. Add [Nightbot](https://beta.nightbot.tv/) to your channel if you haven't already.

3. Click on Commands and then click on Custom	

4. Click Add Command and put in whatever command you want for example !wall.

5. In the Message box insert 
```
$(urlfetch https://youtube-shoutout-wall.herokuapp.com/push_user?uid=$(userid))
```
Note: Do not change anything on the url. Do not replace anything including $(userid).

6. You will need Google API key [Follow These Instructions](https://www.slickremix.com/docs/get-api-key-for-youtube/)

7.  Go to the public folder from the zip file you extracted and open config.js and replace xxx with your Google API key abd your channel id . [Follow This if you don't know how to](https://ultimate.brainstormforce.com/docs/how-to-find-youtube-channel-name-and-channel-id/)

8. The wall should work!!. All you have to do now is open index.js and start live streaming

# Other
If you have any issues with the wall please [open an issue](https://github.com/Moorad/youtube-shoutout-wall/issues/new).
Any pull requests are welcome.

Discord: Moorad#7782

If you want to support me :)
https://paypal.me/moorad
