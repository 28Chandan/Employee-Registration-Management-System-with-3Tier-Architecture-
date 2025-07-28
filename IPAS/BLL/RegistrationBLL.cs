using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iPAS_Service;
namespace IPAS.BLL
{
    public static  class RegistrationBLL
    {
        public static DepartmentListInfo GetDepartment()
        {
            try
            {
                RegistrationService registrationService = new RegistrationService();
                return registrationService.GetDepartment();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static RegistrationInfo InsertNewRegisteredUser(RegistrationInfo newUser)
        {
            try
            {
                RegistrationService registrationService = new RegistrationService();
                return registrationService.InsertNewRegisteredUser(newUser);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static RegistrationInfo BindLanguages()
        {
            try
            {
                RegistrationService registrationService = new RegistrationService();
                return registrationService.BindLanguages();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}