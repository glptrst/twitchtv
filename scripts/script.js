//channels to get info of
var channelsNames = ["ESL_SC2", "OgamingSC2", "freecodecamp", "RobotCaleb"];

//send a jsonp request for each channel
channelsNames.forEach(function getInfo(channel) {
    sendReq(channel);
});

//manage responses
function callback(response) {
    console.log(response);
    var channelName = response._links.channel.split("/")[response._links.channel.split("/").length - 1];

    var el = document.getElementById(channelName);
    if (response.stream === null) {
        el.innerHTML = channelName +": Offline";
    } else {
        el.innerHTML = channelName +": <a href=" + response.stream.channel.url + ">Online</a>" + " " + response.stream.channel.status;
    }
}

//create jsonp request
function sendReq(channel) {
    var scriptEl = document.createElement("script");
    scriptEl.id = "getChannelsInfo";
    scriptEl.src = "https://wind-bow.glitch.me/twitch-api/streams/" + channel + "?callback=callback";
    document.body.appendChild(scriptEl);
    //remove script element
    document.getElementById(scriptEl.id).remove();
};
