jQuery.RegistrationNameSpace = jQuery.RegistrationNameSpace || {};
jQuery.RegistrationNameSpace.ServicePath = "";


function PageLoadFunctions(webservicePath) {
    jQuery.RegistrationNameSpace.ServicePath = webservicePath;
    LoadDept();
    LoadLanguages();
    ko.applyBindings(registrationViewModal);
}

var registrationViewModal = {

    FirstName: ko.observable(),
    LastName: ko.observable(),
    EmailID: ko.observable(),
    UserName: ko.observable(),
    Password: ko.observable(),
    ConfirmPassword: ko.observable(),
    DepartmentList:ko.observableArray([]),
    SelectedDepartment:ko.observable(),
    /*Department: $('#deptddl option:selected').val(),*/
    ResumeUpload: ko.observable(),
    LanguagesList: ko.observableArray([]),
    SelectedLanguagesList: ko.observableArray([]),
    EmpID: 0
}
function LoadDept() {
    jQuery.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_Registration.asmx/GetDepartmentASMX",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const departmentList = response.d.DepartmentInfoList;
            //registrationViewModal.DepartmentList(departmentList);


            // Prepend default "Select Department" option
            const defaultOption = { DeptID: "0", DeptName: "Select Department" };
            const updatedList = [defaultOption, ...departmentList];

            // Bind to observable
            registrationViewModal.DepartmentList(updatedList);
            //const deptDropdown = document.getElementById("deptddl");
            //const deptDropdown = $('#deptddl');

            //deptDropdown.innerHTML = "";

            //const defaultOption = document.createElement("option");
            //defaultOption.value = "0";
            //defaultOption.text = "Select Department";
            //deptDropdown.appendChild(defaultOption);

            //departmentList.forEach(dept => {
            //    const option = document.createElement("option");
            //    option.value = dept.DeptID;
            //    option.text = dept.DeptName;
            //    deptDropdown.appendChild(option);
            //});
        },
        error: function (xhr, status, error) {
            jQuery('#submitLbl').text(("Failed to load departments: " + error).css("color", "green"));
            setTimeout(function () {
                jQuery('#submitLbl').fadeOut(2000);
            }, 3000);
        }
    });

}




function LoadLanguages() {
    jQuery.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_Registration.asmx/BindLanguagesASMX",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
           const languagesList = response.d.LanguagesList;
            registrationViewModal.LanguagesList(languagesList);


            //const container = document.getElementById("langCheckboxList");

            //container.innerHTML = "";   

            //languagesList.forEach(lang => {

            //    const checkbox = document.createElement("input");
            //    checkbox.type = "checkbox";
            //    checkbox.id = "lang_" + lang.LangID;
            //    checkbox.name = "languages";  
            //    checkbox.value = lang.LangID;

            //    const label = document.createElement("label");
            //    label.htmlFor = "lang_" + lang.LangID;
            //    label.textContent = lang.LangName;


            //    const wrapper = document.createElement("div");
            //    wrapper.appendChild(checkbox);
            //    wrapper.appendChild(label);

            //    container.appendChild(wrapper);
            // }
            //);
        },
        error: function (xhr, status, error) {
            jQuery('#submitLbl').text(("Failed to load languages: " + error).css("color", "green"));
            setTimeout(function () {
                jQuery('#submitLbl').fadeOut(2000);
            }, 3000);
        }
    });
}


function onResumeChange() {
    const fileInput = document.getElementById("resumeUpload");
    //registrationViewModal.ResumeUpload(fileInput);
    const file = fileInput?.files[0];
    //const filepath = "~/Resumes/" + file.name;
    if (file) {
        registrationViewModal.ResumeUpload(file.name); // Just the file name (e.g., "resume.docx")
        //fileInput.SaveAs(Server.MapPath(filepath));
    } else {
        registrationViewModal.ResumeUpload(""); // Reset if no file selected
    }
}


function LoginBtn() {
    window.location.href = "Login.aspx";
}

function SubmitRegistration() {
    if (!Validations()) {
        return false;
    }

    // selected IDs
    const langs = registrationViewModal.SelectedLanguagesList().map(id => {
        return { LangID: id };
    });


    const userData = {
        FirstName: registrationViewModal.FirstName(),
        LastName: registrationViewModal.LastName(),
        EmailID: registrationViewModal.EmailID(),
        UserName: registrationViewModal.UserName(),
        Password: registrationViewModal.Password(),
        Department: registrationViewModal.SelectedDepartment(),
        ResumeUpload: registrationViewModal.ResumeUpload(),
        LanguagesList: langs,
        EmpID:0

    };
   

    jQuery.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_Registration.asmx/InsertNewRegisteredUserASMX",
        data: JSON.stringify({ newUser: userData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //const msg = response.d?.label || "No response from server";
            const msg = response.d;
            console.log(response);
            console.log(response.d);
            if (msg.Success) {
                jQuery('#submitLbl').text(msg.label).css("color", "green");
                setTimeout(function () {
                    jQuery('#submitLbl').fadeOut(2000);
                }, 3000);
            } else {
                jQuery('#submitLbl').text(msg.label).css("color", "red");
                setTimeout(function () {
                    jQuery('#submitLbl').fadeOut(2000);
                }, 3000);
            }
            ResetForm();
        },
        error: function (xhr, status, error) {
            console.log("the error is: ", error);
            console.log("The error status is: ", status);
            console.log("The xhr is: ", xhr.responseText);
            //alert("Failed to submit registration: " + error);
            jQuery('#submitLbl').text("Error occurred. Try again.").css("color", "red");
            setTimeout(function () {
                jQuery('#submitLbl').fadeOut(2000);
            }, 3000);
        }
    });

    return false;
}







function ResetForm() {
    registrationViewModal.FirstName("");
    registrationViewModal.LastName("");
    registrationViewModal.EmailID("");
    registrationViewModal.UserName("");
    registrationViewModal.Password("");
    registrationViewModal.ConfirmPassword("");
    registrationViewModal.ResumeUpload("");
    registrationViewModal.SelectedDepartment("Select Department");
    registrationViewModal.SelectedLanguagesList([]);
    document.getElementById('resumeUpload').value = "";

}
//validation
function Validations() {
    const fname = registrationViewModal.FirstName();
    const lname = registrationViewModal.LastName();
    const emailID = registrationViewModal.EmailID();
    const userName = registrationViewModal.UserName();
    const password = registrationViewModal.Password();
    const confirmPassword = registrationViewModal.ConfirmPassword();
    const deptDDL = registrationViewModal.SelectedDepartment();
    const resumeUpload = $('#resumeUpload');
    const errorLog = $('#ErrorLogs');

    // const isLangChecked = selectedLangs();
    const checkboxes = registrationViewModal.SelectedLanguagesList();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d).{8,}$/;
    const firstnamePattern = /^[A-Za-z]+$/;
    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;

    let isValid = true;
    errorLog.html("");

    // First Name
    if (!fname || !firstnamePattern.test(fname)) {
        errorLog.html(errorLog.html() + "FirstName is required and cannot contain numbers or special characters.<br>");
        $('#firstNameTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#firstNameTxt').css('border', '2px solid black');
    }

    // Last Name (Basavraj sir asked to remove the validations for the last name)
    if (lname && !firstnamePattern.test(lname)) {
        errorLog.html(errorLog.html() + " Last Name cannot contain numbers or special characters.<br>");
        $('#lastNameTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#lastNameTxt').css('border', '2px solid black');
    }

    // Email
    if (!emailID || !emailPattern.test(emailID)) {
        errorLog.html(errorLog.html() + "Valid Email ID is required (e.g., example@domain.com).<br>");
        $('#emailTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#emailTxt').css('border', '2px solid black');
    }

    // Username
    if (!userName || !usernamePattern.test(userName)) {
        errorLog.html(errorLog.html() + "Username must start with a letter and can contain letters, numbers, and underscores (4–16 characters).<br>");
        $('#usernameTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#usernameTxt').css('border', '2px solid black');
    }

    // Password
    if (!password || !passwordPattern.test(password)) {
        errorLog.html(errorLog.html() + "Password must be at least 8 characters and contain a number.<br>");
        $('#passwordTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#passwordTxt').css('border', '2px solid black');
    }

    // Confirm Password
    if (!confirmPassword) {
        errorLog.html(errorLog.html() + "Confirm Password is required.<br>");
        $('#confirmPasswordTxt').css('border', '2px solid red');
        isValid = false;
    } else if (password !== confirmPassword) {
        errorLog.html(errorLog.html() + "Passwords do not match.<br>");
        $('#confirmPasswordTxt').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#confirmPasswordTxt').css('border', '2px solid black');
    }

    // Department
    if (deptDDL === "0") {
        errorLog.html(errorLog.html() + "Please select a department.<br>");
        $('#deptddl').css('border', '2px solid red');
        isValid = false;
    } else {
        $('#deptddl').css('border', '2px solid black');
    }

    //languages
    if (registrationViewModal.SelectedLanguagesList().length === 0) {
        errorLog.html(errorLog.html() + "Please check atleast one option.<br>");
        $('#langCheckboxList').css('border', '2px solid red');
        isValid = false;
    }
    else {

        $('#langCheckboxList').css('border', '2px solid black');
    }


    // Resume Upload
    const fileInput = resumeUpload;//returns jquery object
    if (!fileInput.val().trim()) {
        errorLog.html(errorLog.html() + "Resume upload is required.<br>");
        fileInput.css('border', '2px solid red');
        isValid = false;
    } else {
        const file = fileInput[0].files[0];
        if (file) {
            const name = file.name;
            const size = file.size;
            const ext = name.split('.').pop().toLowerCase();
            const allowedExt = ['doc', 'docx', 'pdf'];
            const maxSize = 2 * 1024 * 1024;

            if (!allowedExt.includes(ext)) {
                errorLog.html(errorLog.html() + "Resume must be .doc, .docx, or .pdf.<br>");
                fileInput.css('border', '2px solid red');
                isValid = false;
            } else if (size > maxSize) {
                errorLog.html(errorLog.html() + "Resume file must be ≤ 2 MB.<br>");
                fileInput.css('border', '2px solid red');
                isValid = false;
            } else {
                fileInput.css('border', '2px solid black');
            }
        } else {
            fileInput.css('border', '2px solid red');
            isValid = false;
        }
    }

    return isValid;
}





//function Validations() {
//    const fname = $('#firstNameTxt');
//    const lname = $('#lastNameTxt');
//    const emailID = $('#emailTxt');
//    const userName = $('#usernameTxt');
//    const password = $('#passwordTxt');
//    const confirmPassword = $('#confirmPasswordTxt');
//    const deptDDL = $('#deptddl');
//    const resumeUpload = $('#resumeUpload');
//    const errorLog = $('#ErrorLogs');
//    const langCheckBox = $('#langCheckboxList');
//    // const isLangChecked = selectedLangs();
//    const checkboxes = registrationViewModal.SelectedLanguagesList();

//    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    const passwordPattern = /^(?=.*\d).{8,}$/;
//    const firstnamePattern = /^[A-Za-z]+$/;
//    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;

//    let isValid = true;
//    errorLog.html("");

//    // First Name
//    if (fname.val().trim() === '' || !firstnamePattern.test(fname.val().trim())) {
//        errorLog.html(errorLog.html() + "FirstName is required and cannot contain numbers or special characters.<br>");
//        fname.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        fname.css('border', '2px solid black');
//    }

//    // Last Name (Basavraj sir asked to remove the validations for the last name)
//    if (!firstnamePattern.test(lname.val().trim())) {
//        errorLog.html(errorLog.html() + " Last Name cannot contain numbers or special characters.<br>");
//        lname.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        lname.css('border', '2px solid black');
//    }

//    // Email
//    if (emailID.val().trim() === '' || !emailPattern.test(emailID.val().trim())) {
//        errorLog.html(errorLog.html() + "Valid Email ID is required (e.g., example@domain.com).<br>");
//        emailID.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        emailID.css('border', '2px solid black');
//    }

//    // Username
//    if (userName.val().trim() === '' || !usernamePattern.test(userName.val().trim())) {
//        errorLog.html(errorLog.html() + "Username must start with a letter and can contain letters, numbers, and underscores (4–16 characters).<br>");
//        userName.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        userName.css('border', '2px solid black');
//    }

//    // Password
//    if (password.val().trim() === '' || !passwordPattern.test(password.val().trim())) {
//        errorLog.html(errorLog.html() + "Password must be at least 8 characters and contain a number.<br>");
//        password.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        password.css('border', '2px solid black');
//    }

//    // Confirm Password
//    if (confirmPassword.val().trim() === '') {
//        errorLog.html(errorLog.html() + "Confirm Password is required.<br>");
//        confirmPassword.css('border', '2px solid red');
//        isValid = false;
//    } else if (password.val().trim() !== confirmPassword.val().trim()) {
//        errorLog.html(errorLog.html() + "Passwords do not match.<br>");
//        confirmPassword.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        confirmPassword.css('border', '2px solid black');
//    }

//    // Department
//    if (deptDDL.val().trim() === "0") {
//        errorLog.html(errorLog.html() + "Please select a department.<br>");
//        deptDDL.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        deptDDL.css('border', '2px solid black');
//    }

//    //languages
//    if (registrationViewModal.SelectedLanguagesList().length===0) {
//        errorLog.html(errorLog.html() + "Please check atleast one option.<br>");
//        langCheckBox.css('border', '2px solid red');
//        isValid = false;
//    }
//    else {

//        langCheckBox.css('border', '2px solid black');
//    }


//    // Resume Upload
//    const fileInput = resumeUpload;//returns jquery object
//    if (!fileInput.val().trim()) {
//        errorLog.html(errorLog.html() + "Resume upload is required.<br>");
//        fileInput.css('border', '2px solid red');
//        isValid = false;
//    } else {
//        const file = fileInput[0].files[0];
//        if (file) {
//            const name = file.name;
//            const size = file.size;
//            const ext = name.split('.').pop().toLowerCase();
//            const allowedExt = ['doc', 'docx', 'pdf'];
//            const maxSize = 2 * 1024 * 1024;

//            if (!allowedExt.includes(ext)) {
//                errorLog.html(errorLog.html() + "Resume must be .doc, .docx, or .pdf.<br>");
//                fileInput.css('border', '2px solid red');
//                isValid = false;
//            } else if (size > maxSize) {
//                errorLog.html(errorLog.html() + "Resume file must be ≤ 2 MB.<br>");
//                fileInput.css('border', '2px solid red');
//                isValid = false;
//            } else {
//                fileInput.css('border', '2px solid black');
//            }
//        } else {
//            fileInput.css('border', '2px solid red');
//            isValid = false;
//        }
//    }

//    return isValid;
//}
