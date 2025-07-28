function PageLoadFunctions() {
    SessionStatus();
}




function SessionStatus() {
        var actState = sessionStorage.getItem("activeNav");

        if (actState === "home") {
            jQuery('#homeBtn').addClass("actBtn");
        } else if (actState === "contact") {
            jQuery('#contactBtn').addClass("actBtn");
        } else if (actState === "about") {
            jQuery('#aboutBtn').addClass("actBtn");
        }
 }



function HomeBtnClick() {
    sessionStorage.setItem("activeNav", "home");
    window.location.href = "Home.aspx";
}


function ContactBtnClick() {
    sessionStorage.setItem("activeNav", "contact");
    window.location.href = "Contact.aspx";
}


function AboutBtnClick() {
    sessionStorage.setItem("activeNav", "about");
    window.location.href = "About.aspx";
}

$(document).ready(function () {
    PageLoadFunctions();
});