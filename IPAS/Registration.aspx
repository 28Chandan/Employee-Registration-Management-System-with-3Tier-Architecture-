<%@ Page Title="" Language="C#" MasterPageFile="~/Pre_Login.Master" AutoEventWireup="true" CodeBehind="Registration.aspx.cs" Inherits="IPAS.Registration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <button id="LogInBtn" class="LogInBtn" type="button" onclick="LoginBtn();"><%= GetGlobalResourceObject("RegistrationPage_Resource", "logIn") %></button>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <style>
        .LogInBtn {
            font-size: 20px;
            background-color: #14B8A6;
            height: 30px;
            width: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid black;
            border-radius: 6px;
            margin-left: 950px;
        }

            .LogInBtn:hover {
                background-color: dimgray;
                color: white;
                cursor: pointer;
            }

        #registrationContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150vh;
            background-color: beige;
        }

        #registrationBox {
            height: auto;
            width: 920px;
            background-color: white;
            border: 2px solid black;
            border-radius: 8px;
        }

        .regItem {
            border-radius: 8px;
            background-color: #FCF5D8;
            Height: 35px;
            Width: 616px;
        }

        .UserDetails {
            display: inline-block;
            width: 150px;
        }

        .deptddl {
            border: 2px solid black;
        }

        #submitContainer {
            display: flex;
            justify-content: center;
        }
        /*
        #langCheckboxList {
            display: flex;
            flex-direction: column;
            padding: 5px;
        }*/
        .langCheckboxListClass {
            border-radius: 8px;
            background-color: #FCF5D8;
            Height: auto;
            Width: 616px;
            display: flex;
            flex-direction: column;
            padding: 5px;
        }
    </style>

    <div id="form22">
        <div id="registrationContainer">

            <div id="registrationBox">

                <h1 style="text-align: center"><%= GetGlobalResourceObject("RegistrationPage_Resource", "registrationPageHeading") %></h1>


                <div id="firstNameContainer" style="padding-left: 15px">
                    <label id="firstName" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "firstName") %>&nbsp; </label>
                    <input id="firstNameTxt" class="regItem" type="text" data-bind="value: FirstName" />

                </div>

                <br />

                <div id="lastNameContainer" style="padding-left: 15px">
                    <label id="lastName" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "lastName") %>&nbsp;&nbsp; </label>
                    <input id="lastNameTxt" class="regItem" type="text" data-bind="value: LastName"  />
                </div>

                <br />


                <div id="emailContainer" style="padding-left: 15px">
                    <label id="email" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "emailID") %></label>

                    <input id="emailTxt" class="regItem" type="text" data-bind="value: EmailID"  />

                    <br />
                </div>
                <br />

                <div id="usernameContainer" style="padding-left: 15px">
                    <label id="username" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "userName") %>&nbsp;&nbsp; </label>
                    <input id="usernameTxt" class="regItem" type="text" data-bind="value: UserName"  />
                </div>

                <br />

                <div id="passwordContainer" style="padding-left: 15px">
                    <label id="Password" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "password") %></label>

                    <input id="passwordTxt" class="regItem" type="password" data-bind="value: Password"  />
                    <br />
                </div>
                <br />

                <div id="confirmPasswordContainer" style="padding-left: 15px">
                    <label id="confirmPassword" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "confirmPassword") %> </label>
                    <input id="confirmPasswordTxt" class="regItem" type="password" data-bind="value: ConfirmPassword"  />

                </div>

                <br />

                <div id="deptContainer" style="padding-left: 15px">
                    <label id="dept" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "department") %> </label>
                    <%--     <select id="deptddl" class="regItem" class="form-control">--%>
                    <select id="deptddl" class="regItem"
                        data-bind="options: DepartmentList, 
                                optionsText: 'DeptName', 
                                optionsValue: 'DeptName', 
                                value: SelectedDepartment,">
                    </select>

                </div>
                <br />

                <label id="lang" class="UserDetails" style="padding-left: 15px">
                    <%= GetGlobalResourceObject("RegistrationPage_Resource", "Languages") %>
                </label>
                <div id="langContainer" style="padding-left: 160px">

                    <div id="langCheckboxList" class="langCheckboxListClass" data-bind="foreach: LanguagesList">
                        <label>
                            <input type="checkbox"
                                data-bind="value: LangID, 
                          checked: $parent.SelectedLanguagesList" />
                            <span data-bind="text: LangName"></span>
                        </label>
                    </div>

                </div>

                <br />

                <div id="resumeContainer" style="padding-left: 15px">
                    <label id="resume" class="UserDetails"><%= GetGlobalResourceObject("RegistrationPage_Resource", "resumeUpload") %> </label>
                    <input type="file" id="resumeUpload" name="resumeUpload" onchange="onResumeChange()" />

                </div>
                <br />

                <label id="submitLbl" ></label>
                <div id="ErrorLogs" style="color: red;">
                </div>

                <br />
                <br />
                <div id="submitContainer" style="padding-left: 15px">




                    <button type="submit"
                        id="submitButton"
                        style="height: 33px; width: 363px; background-color: green; border: 2px solid black;"
                        data-bind="click:SubmitRegistration">
                        <%= GetGlobalResourceObject("RegistrationPage_Resource", "submit") %>
                    </button>


                    <button
                        type="button"
                        id="clearButton"
                        style="height: 33px; width: 369px; background-color: red; border: 2px solid black;"
                         data-bind="click:ResetForm">
                        <%= GetGlobalResourceObject("RegistrationPage_Resource", "clear") %>
                    </button>

                </div>
                <br />
                <br />

            </div>
        </div>
    </div>
    <!-- jQuery Library (required for AJAX) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- Your custom login script -->
    <script src='<%= System.Configuration.ConfigurationManager.AppSettings["DepartmentJsPath"] %>Registration.js'></script>
</asp:Content>
