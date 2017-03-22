var channels = ["ESL_SC2", "OgamingSC2", "freecodecamp", "RobotCaleb"];

channels.forEach(function getInfo(channel) {
    sendReq(channel);
});

function callback(response) {
    console.log(response);
}

function sendReq(channel) {
    var scriptEl = document.createElement("script");
    scriptEl.id = "getChannelsInfo";
    scriptEl.src = "https://wind-bow.glitch.me/twitch-api/streams/" + channel + "?callback=callback";
    document.body.appendChild(scriptEl);
    //remove script element
    document.getElementById(scriptEl.id).remove();
};
