const player = {
    avatarImage,
    avatarName,
    xp,      
}

function Start()
{
    player.avatarName = "Some name";
    player.avatarImage = "Some image soon";
    player.xp = 0;
}

window.onload = Start();