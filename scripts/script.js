//channels to get info of
var channelsNames = ["ESL_SC2", "OgamingSC2", "FreeCodeCamp", "RobotCaleb", "comster404"];

channelsNames.forEach(function getInfo(channel) {
    sendReq(channel, "https://wind-bow.glitch.me/twitch-api/channels/", "callback");
});

function callback(response) {
    if (response.status === 404) {
        var channelName = response.message.split(" ")[1];
        channelName = channelName.slice(1, channelName.length-1);
        var el = document.getElementById(channelName);
        el.innerHTML = channelName + ': <span class="inexistent">Inexistent</span>';
    } else {
        sendReq(response.display_name, "https://wind-bow.glitch.me/twitch-api/streams/", "callback2");
    }
}

function callback2(response) {
    var channelName = response._links.channel.split("/")[response._links.channel.split("/").length - 1];
    var el = document.getElementById(channelName);
    if (response.stream === null) {
        el.innerHTML = channelName +": Offline";
    } else {
        el.innerHTML = channelName +": <a href=" + response.stream.channel.url + ">Online</a>" + " " + response.stream.channel.status;
    }
}

//create jsonp request
function sendReq(channel, url, callback) {
    var scriptEl = document.createElement("script");
    scriptEl.id = "getChannelsInfo";
    scriptEl.src = url + channel + "?callback=" + callback;
    document.body.appendChild(scriptEl);
    //remove script element
    document.getElementById(scriptEl.id).remove();
};
