<%@ Page Title="" Language="C#" MasterPageFile="~/Pre_Login.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="IPAS.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <style>

        #loginContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: lightpink;
            height: 100vh;
        }


        #loginBox {
            height: 450px;
            width: 350px;
            background-color: white;
            border: 2px solid black;
            border-radius: 8px;
        }

        #userName {
            font-size: 20px;
            font-weight: bold;
            padding-left: 4px;
            display: block;
        }


        #password {
            font-size: 20px;
            font-weight: bold;
            padding-left: 4px;
            display: block;
        }

        .submitButton{
            cursor:pointer;
        }
        
    </style>
    <div id="loginContainer">
        <div id="loginBox">

            <h1 style="text-align: center"><%= GetGlobalResourceObject("LoginPage_Resource", "loginPageHeading") %> </h1>
                <div id="userNameContainer" style="padding-left: 15px">
                <label id="userName"><%= GetGlobalResourceObject("LoginPage_Resource", "userName") %> </label>
                <input type="text" id="userNameTxt" style="height:26px; width:306px" data-bind="value: userName"/>
               </div>
            <br />
            
            <div id="passwordContainer" style="padding-left: 15px">
                <label id="password"><%= GetGlobalResourceObject("LoginPage_Resource", "password") %> </label>
            <input type="password"   id="passwordTxt" style="height:26px; width:306px" data-bind="value: password" />
            </div>

         


            <label id="LoginLabel"></label>
            <br />
            <br />

            <div id="submitContainer" style="padding-left: 15px">
              
               
           <button id="submitButton" type="button" class="submitButton" data-bind="click: submitBtn" style="height:33px; width:306px; background-color:#0066FF; border-color:black; border-style:solid; border-width:2px;"><%= GetGlobalResourceObject("LoginPage_Resource", "submit") %></button>
            </div>

            <br />
            <br />
            <h3 style="padding-left: 15px"><%= GetGlobalResourceObject("LoginPage_Resource", "newRegistration") %> <a href="Registration.aspx"><%= GetGlobalResourceObject("LoginPage_Resource", "signIn") %>
               
                <label id="Label1"></label>
            </a></h3>

        </div>


    </div>
 

<!-- Your custom login script -->
<script src='<%= System.Configuration.ConfigurationManager.AppSettings["LoginJsPath"] %>Login.js'></script>




</asp:Content>
