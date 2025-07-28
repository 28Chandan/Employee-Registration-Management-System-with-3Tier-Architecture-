//jQuery.EmployeeProfileNameSpace = jQuery.EmployeeProfileNameSpace || {};
//jQuery.EmployeeProfileNameSpace.ServicePath = "";




function PageLoadFunctions(webservicePath) {
   // jQuery.EmployeeProfileNameSpace = webservicePath;
    LoadSession();
    LoadLanguages();
    LoadEmployeeData();
    LoadValidations();
    ko.applyBindings(employeeViewModal);

    // selectedLanguages();

}


function LoadValidations() {
    const mobileInput = document.getElementById('mobileNumTxt');
    //  const mobileInput = $('#mobileNumTxt');
    if (mobileInput) {
        mobileInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
    }
}

//here i want only employee should enter, if session has null then load login page
function LoadSession() {
    //const usernameSession = sessionStorage.getItem("username");
    const userEmpIDSession = sessionStorage.getItem("EmpID");
    const userRoleSession = sessionStorage.getItem("role");
    if (!userEmpIDSession || !userRoleSession) {
        window.location.href = "Login.aspx";
    }
    if (userRoleSession !== "2") {
        window.location.href = "Login.aspx";
    }
}


var employeeViewModal = {
    LanguagesList: ko.observableArray([]),
    SelectedLanguagesList: ko.observableArray([]),
    FirstName: ko.observable(""),
    LastName: ko.observable(""),
    Department: ko.observable(""),
    EmailID: ko.observable(""),
    Address: ko.observable(""),
    Gender: ko.observable(""),
    MobileNum: ko.observable("")

}


//loading languages in the employee page
function LoadLanguages() {
    jQuery.ajax({
        type: "POST",
        //url: jQuery.EmployeeProfileNameSpace +"/iPAS_Registration.asmx/BindLanguagesASMX",
        url: "/WEB_SERVICES/iPAS_Registration.asmx/BindLanguagesASMX",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const languagesList = response.d.LanguagesList;
            employeeViewModal.LanguagesList(languagesList);
            console.log(" all languages list",employeeViewModal.LanguagesList());
        },
        error: function (xhr, status, error) {
           // alert("Failed to load languages: " + error);
            jQuery('#submitLbl').text("Failed to load languages: " + error).css("color", "red");
            setTimeout(function () {
                jQuery('#submitLbl').fadeOut(2000);
            }, 2000);
        }
    });
}



function LoadEmployeeData() {
    const userEmpIDSession = sessionStorage.getItem("EmpID");
    const userRoleSession = sessionStorage.getItem("role");
    jQuery.ajax({
        type: "POST",
        //url: jQuery.EmployeeProfileNameSpace +"/iPAS_Employee.asmx/FetchEmployeeDataASMX",
        url: "/WEB_SERVICES/iPAS_Employee.asmx/FetchEmployeeDataASMX",
        data: JSON.stringify({ empID: userEmpIDSession  }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const employeeData = response.d;
            employeeViewModal.FirstName(employeeData.FirstName);
            employeeViewModal.LastName(employeeData.LastName);
            employeeViewModal.EmailID(employeeData.EmailID);
            employeeViewModal.MobileNum(employeeData.MobileNumber);
            employeeViewModal.Department(employeeData.Department);
            employeeViewModal.Address(employeeData.Address);
            employeeViewModal.Gender(employeeData.Gender);

            const selectedLangIDs = response.d.LanguagesList.map(lang => parseInt(lang.LangID));
            employeeViewModal.SelectedLanguagesList(selectedLangIDs);

            //selectedLangIDs.forEach(langID => {
            //    const checkbox = document.getElementById("lang_" + langID);
            //    if (checkbox) {
            //        checkbox.checked = true;
            //    }
            //});



            if (userRoleSession == "2") {
                /*visibility of the controls as per role...*/
                jQuery('#firstNameTxt').prop('disabled', true);
                jQuery('#lastNameTxt').prop('disabled', true);
                jQuery('#emailTxt').prop('disabled', true);
                jQuery('#deptTxt').prop('disabled', true);
            }
            if (userRoleSession == "1") {

                /*visibility of the controls as per role...*/
                jQuery('#firstNameTxt').prop('disabled', false);
                jQuery('#lastNameTxt').prop('disabled', false);
                jQuery('#emailTxt').prop('disabled', false);
                jQuery('#deptTxt').prop('disabled', false);
            }

        },
        error: function (xhr, status, error) {
            //console.error("Error fetching employee data:", error);
            jQuery('#submitLbl').text("Failed to load languages: " + error).css("color", "red");
            setTimeout(function () {
                jQuery('#submitLbl').fadeOut(2000);
            }, 2000);
        }
    });
}

function LogOutBtnClick() {
    window.location.href = "Login.aspx";
}

function Validations() {
    const mnumber = jQuery('#mobileNumTxt').val().trim();
    const selectedGender = jQuery('input[name="gender"]:checked').val();

    const mobileNumPattern = /^[6-9]\d{9}$/;

    let isValid = true;
    const errorLog = jQuery('#ErrorLogs');
    errorLog.html("");
    jQuery('#submitLbl').text("");
    jQuery('#mobileNumTxt').css('border', '2px solid none');

    //mobile number
    if (mnumber === '' || !mobileNumPattern.test(mnumber)) {
        errorLog.html(errorLog.html() + "Mobile Number cannot be empty and should be a valid 10-digit number starting with 6-9.<br>");
        jQuery('#mobileNumTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        jQuery('#mobileNumTxt').css('border', '2px solid black');
    }

    //gender
    if (!selectedGender) {
        errorLog.html(errorLog.html() + "Please select a gender.<br>");
        jQuery('#RadioButtonList1').css('outline', '2px solid red');
        isValid = false;
    } else {
        jQuery('#RadioButtonList1').css('outline', '2px solid none');
    }

    return isValid;

}

//function selectedLangs() {
//    var selectedLangList = [];
//    let checkboxes = $('input[name="languages"]:checked');
//    for (var i = 0; i < checkboxes.length; i++) {
//        selectedLangList.push({
//            LangID: parseInt(checkboxes[i].value)
//        });
//    }
//    return selectedLangList;
//}
function SubmitEmployeeDataUpdateBtn() {
    if (!Validations()) {
        return false;
    }
    // selected IDs

    const langs = employeeViewModal.SelectedLanguagesList().map(id => {
        return { LangID: id };
    });

    //const usernameSession = sessionStorage.getItem("username");
    const userEmpIDSession = sessionStorage.getItem("EmpID");
    const employeeData = {
        FirstName: employeeViewModal.FirstName(),
        LastName: employeeViewModal.LastName(),
        EmailID: employeeViewModal.EmailID(),
        Department: employeeViewModal.Department(),
        MobileNumber: employeeViewModal.MobileNum(),
        Gender: employeeViewModal.Gender(),
        Address: employeeViewModal.Address(),
        EmpID: userEmpIDSession,

        LanguagesList: langs





        //FirstName: $('#firstNameTxt').val().trim(),
        //LastName: $('#lastNameTxt').val().trim(),
        //EmailID: $('#emailTxt').val().trim(),
        //Department: $('#deptTxt').val().trim(),
        //MobileNumber: $('#mobileNumTxt').val().trim(),
        //Gender: $('input[name="gender"]:checked').val().trim(),
        //Address: $('#adressTxt').val().trim(),
        //EmpID: userEmpIDSession,
        //LanguagesList: selectedLangs()

        // UserName: usernameSession

    };


    //this was to update the employee data via his own page
    jQuery.ajax({
        type: "POST",
       // url: jQuery.EmployeeProfileNameSpace +"/iPAS_Employee.asmx/UpdateEmployeeDataASMX",
        url:"/WEB_SERVICES/iPAS_Employee.asmx/UpdateEmployeeDataASMX",
        data: JSON.stringify({ employee: employeeData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.d === true) {
                jQuery('#submitLbl').text("Successfully inserted the data").css("color", "green");
                setTimeout(function () {
                    jQuery('#submitLbl').fadeOut(2000);
                }, 2000);
            }
            else {
                jQuery('#submitLbl').text("failed to update the data").css("color", "red");
               setTimeout(function () {
                    jQuery('#submitLbl').fadeOut(2000);
                }, 2000);
            }

            //const msg = response.d;
            //$('#submitLbl').text(msg);
            //$('#submitLbl').css("color", "green");
            //const msg = response.d?.label || "No response from server";
            //$('#submitLbl').text(msg);
            //$('#submitLbl').css("color", "green");


        },
        error: function (xhr, status, error) {
            //alert("Failed to submit registration: " + error);
            //$('#submitLbl').text("Error occurred. Try again.");
            //console.log("error occured: ", error)
            jQuery('#submitLbl').text("error is: ", error).css("color", "red");
            setTimeout(function () {
                jQuery('#submitLbl').fadeOut(2000);
            }, 2000);
        }
    });

    return false;
}








