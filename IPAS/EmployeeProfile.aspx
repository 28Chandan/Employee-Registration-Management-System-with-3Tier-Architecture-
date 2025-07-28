<%@ Page Title="" Language="C#" MasterPageFile="~/Post_Login.Master" AutoEventWireup="true" CodeBehind="EmployeeProfile.aspx.cs" Inherits="IPAS.EmployeeProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <button id="logOutBtn" type="button" class="logOutBtn" onclick=" return LogOutBtnClick();"><%= GetGlobalResourceObject("EmployeePage_Resource", "logOut") %></button>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">



    <style>
        .logOutBtn {
            margin-left: 910px;
            font-size: 20px;
            background-color: #14B8A6;
            height: 30px;
            width: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #0f766e;
            border-radius: 6px;
            margin-right: 25px;
            cursor: pointer;
        }

            .logOutBtn:hover {
                background-color: dimgray;
                color: white;
                cursor: pointer;
            }

        #employeeProfileContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: beige;
            height: 120vh;
        }

        #employeeProfileBox {
            height: 650px;
            width: 90%;
            background-color: white;
            border: 2px solid black;
            border-radius: 8px;
        }



        .lines {
            height: 80px;
            margin-bottom: 10px;
            background-color: #FCF5D8;
            padding-left: 30px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        #langContainer {
            height: auto;
            margin-bottom: 10px;
            background-color: #FCF5D8;
            padding-left: 140px;
            /*   display: flex;
            justify-content: space-around;*/
            align-items: center;
        }

        #thirdLine {
            height: 80px;
            margin-bottom: 10px;
            background-color: #FCF5D8;
            padding-left: 160px;
        }

        .textBoxes {
            border-radius: 8px;
            Height: 31px;
            Width: 184px;
        }

        .adressTxt {
            border-radius: 8px;
        }

        #FourthLine {
            padding-left: 160px;
        }

        .submitBtn {
            border-radius: 8px;
            cursor: pointer;
        }
    </style>
    <div id="employeeProfileContainer">
        <div id="employeeProfileBox">
            <h1 style="text-align: center"><%= GetGlobalResourceObject("EmployeePage_Resource", "employeePageHeading") %></h1>

            <div id="firstLine" class="lines">
                <div id="firstNameDiv">
                    <label><%= GetGlobalResourceObject("EmployeePage_Resource", "firstName") %> </label>
                    <br />
                    <%-- <asp:TextBox ID="firstNameTxt" CssClass="textBoxes" runat="server"></asp:TextBox>--%>
                    <input type="text" id="firstNameTxt" class="textBoxes" data-bind="value: FirstName" />
                </div>
                <div id="lastNameDiv">
                    <label><%= GetGlobalResourceObject("EmployeePage_Resource", "lastName") %> </label>
                    <br />
                    <%-- <asp:TextBox ID="lastNameTxt" CssClass="textBoxes" runat="server"></asp:TextBox>--%>
                    <input id="lastNameTxt" class="textBoxes" type="text" data-bind="value: LastName" />
                </div>
                <div id="emailDiv">
                    <label><%= GetGlobalResourceObject("EmployeePage_Resource", "emailID") %></label><br />
                    <%-- <asp:TextBox ID="emailTxt" CssClass="textBoxes" runat="server"></asp:TextBox>--%>
                    <input id="emailTxt" class="textBoxes" type="text" data-bind="value: EmailID" />
                </div>
            </div>


            <div id="secondLine" class="lines">
                <div id="mobileNumDiv">
                    <label><%= GetGlobalResourceObject("EmployeePage_Resource", "mobileNumber") %> </label>
                    <br />
                    <%-- <asp:TextBox ID="mobileNumTxt" CssClass="textBoxes" runat="server"></asp:TextBox>--%>
                    <input id="mobileNumTxt" class="textBoxes"
                        type="text"
                        maxlength="10"
                        inputmode="numeric"
                        pattern="\d*"
                        title="Please enter a 10-digit mobile number" data-bind="value: MobileNum" />



                    <%-- <input id="mobileNumTxt" class="textBoxes" type="text" maxlength="10" title="Please enter only digits"  pattern="\d*" inputmode="numeric" />--%>
                </div>
                <div id="genderDiv">
                    <label><%= GetGlobalResourceObject("EmployeePage_Resource", "gender") %></label><br />
                    <%--<asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem>Male</asp:ListItem>
                            <asp:ListItem>Female</asp:ListItem>
                            <asp:ListItem>Other</asp:ListItem>
                        </asp:RadioButtonList>--%>

                    <div id="RadioButtonList1" style="display: flex; gap: 20px;">
                        <label>
                            <input type="radio" name="gender" value="Male" data-bind="checked: Gender" />
                            <%= GetGlobalResourceObject("EmployeePage_Resource", "male") %>
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Female" data-bind="checked: Gender" />
                            <%= GetGlobalResourceObject("EmployeePage_Resource", "female") %>
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Other" data-bind="checked: Gender" />
                            <%= GetGlobalResourceObject("EmployeePage_Resource", "other") %>
                        </label>
                    </div>


                </div>
                <div id="deptDiv">
                    <label><%= GetGlobalResourceObject("EmployeePage_Resource", "department") %></label><br />
                    <%--  <asp:TextBox ID="deptTxt" CssClass="textBoxes" runat="server"></asp:TextBox>--%>
                    <input id="deptTxt" class="textBoxes" type="text" data-bind="value: Department" />
                </div>
            </div>


            <div id="thirdLine">

                <label><%= GetGlobalResourceObject("EmployeePage_Resource", "address") %></label><br />
                <%--  <asp:TextBox ID="adressTxt" class="adressTxt" runat="server" Height="57px" Width="654px" BorderColor="Black" BorderStyle="Solid" BorderWidth="2px" TextMode="MultiLine"></asp:TextBox>--%>
                <textarea id="adressTxt" class="adressTxt" data-bind="value: Address"
                    style="height: 57px; width: 654px; border: 2px solid black;">
                </textarea>

            </div>
            <br />




            <div id="langContainer">

                <label id="lang" style="padding-left: 15px">
                    <%= GetGlobalResourceObject("RegistrationPage_Resource", "Languages") %>
                </label>
                <br />

              


               <div id="langCheckboxList" class="langCheckboxListClass" data-bind="foreach: LanguagesList">
                    <label>
                        <input type="checkbox"
                            name="languages"
                            data-bind="value: LangID, checked: $parent.SelectedLanguagesList">
                        <span data-bind="text: LangName"></span>
                    </label>
                </div>

            </div>
            <br />

            <label id="submitLbl"></label>
            <div id="ErrorLogs" style="color: red;">
            </div>



            <div id="FourthLine">

                <%-- <asp:Button ID="submitBtn" CssClass="submitBtn" runat="server" Text="Submit" Height="49px" Width="270px" BackColor="#006600" BorderColor="Black" BorderStyle="Solid" BorderWidth="2px" Font-Bold="True" OnClick="submitBtn_Click" />
                --%>


                <button id="submitBtn" type="button" class="submitBtn"
                    style="border: 2px solid black; height: 49px; width: 270px; background-color: #006600; font-weight: bold;"
                    onclick="return SubmitEmployeeDataUpdateBtn();">
                    <%= GetGlobalResourceObject("EmployeePage_Resource", "submit") %>
                </button>
                <%--<asp:Label ID="submitLbl" runat="server"></asp:Label>--%>
            </div>


        </div>


    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- Your custom login script -->
    <script src='<%= System.Configuration.ConfigurationManager.AppSettings["EmployeeJsPath"] %>Employee.js'></script>


</asp:Content>
