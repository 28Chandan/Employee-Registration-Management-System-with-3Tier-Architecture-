using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iPAS_Service;

namespace IPAS.BLL
{
    public  class LoginBLL
    {

        public static RegistrationInfo UserCredential(RegistrationInfo user)
        {
            //LoginService loginService = new LoginService();
            //Login_ServiceReference.LoginClient loginService = new Login_ServiceReference.LoginClient();

            try
            {

                
                LoginService loginService = new LoginService();
                // loginService.Close();
                return loginService.UserCredential(user);
            }
            catch(Exception ex)
            {
               // loginService.Abort();
                throw ex;
            }
        }


    }
}