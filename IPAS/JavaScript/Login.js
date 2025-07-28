//jQuery.LoginNameSpace = jQuery.LoginNameSpace || {};
//jQuery.LoginNameSpace.ServicePath = "";

var loginViewModal = {
    userName: ko.observable(),
    password: ko.observable()
}
function pageloadFunctions(webservicePath) {
    //jQuery.LoginNameSpace= webservicePath;
    //console.log("The error is: ",jQuery.LoginNameSpace);
    //console.log("The error is: ", jQuery.LoginNameSpace.ServicePath + "/iPAS_Login.asmx/UserCredentialASMX");
    ko.applyBindings(loginViewModal);
}
function submitBtn() {
    var userName = loginViewModal.userName();//document.getElementById("userNameTxt").value();//
    var password = loginViewModal.password();// document.getElementById("passwordTxt");//
    var loginLabel = jQuery('#LoginLabel');//document.getElementById("LoginLabel"); //
    //console.log("The error is: ", jQuery.LoginNameSpace.ServicePath + "/iPAS_Login.asmx/UserCredentialASMX");

    if (!userName || !password) {
       loginLabel.text("Please enter both username and password.").css("color", "red");
       return;
    }
    jQuery.ajax({
        type: "POST",
       // url: jQuery.LoginNameSpace + "/iPAS_Login.asmx/UserCredentialASMX",
        url:  "/WEB_SERVICES/iPAS_Login.asmx/UserCredentialASMX",
        data: JSON.stringify({ user: { UserName: userName, Password: password } }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
            success: function (response) {
            const result = response.d;
            if (result.Success) {
                if (result.Role === "1") {
                    sessionStorage.setItem("role", result.Role);
                    window.location.href = "HRDashboardProfile.aspx";

                }
                else if (result.Role === "2") {

                    if (result.Status === "Accept") {
                        sessionStorage.setItem("EmpID", result.EmpID);
                        sessionStorage.setItem("role", result.Role);
                        window.location.href = "EmployeeProfile.aspx";
                    }

                    else if (result.Status === "Reject") {
                        loginLabel.text(`Your application was rejected due to: ${result.RejectReason}, register once again`).css("color", "red");
                        setTimeout(function () {
                            loginLabel.fadeOut(3000);
                            window.location.href = "Registration.aspx";
                        }, 5000);
                    }

                    else if (result.Status === "Pending") {
                      loginLabel.text("Your application is in Pending state, wait for HR approval.").css("color", "red");
                        setTimeout(function () {
                            loginLabel.fadeOut(3000);
                            window.location.href = "Home.aspx";
                        }, 5000);
                     }
                }
            }
            else {
                loginViewModal.userName("");
                loginViewModal.password("");
                loginLabel.text(result.label).css("color", "red");
                setTimeout(function () {
                    loginLabel.fadeOut(3000);
                }, 2000);
            }
        },
        error: function () {
            loginLabel.text("Invalid username or password...").css("color", "red");
            loginLabel.fadeOut(5000);
        }
    });
};

