/**
 * Created by Kyle on 11/29/2015.
 */
function setCookie(cname, cvalue, exdays) {
    document.cookie = cname + "=" + cvalue + "; ";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function resetHighScore()
{
    setCookie("HighScore","0",365);
}


