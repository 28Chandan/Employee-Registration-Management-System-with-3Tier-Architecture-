using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace iPAS_Service
{
    [DataContract]
    public class UserLoginInfo
    {
        [DataMember]
        public string UserName { get; set; } = string.Empty;
        [DataMember]
        public string Password { get; set; } = string.Empty;
        [DataMember]
        public int Role { get; set; } = 0;
        [DataMember]
        public string Status { get; set; } = string.Empty;
        [DataMember]
        public string RejectReason { get; set; } = string.Empty;
        [DataMember]
        public int EmpID { get; set; } = 0;
        [DataMember]
        public bool isTrue { get; set; }
    }

   

    [DataContract]
    public class DepartmentInfo
    {
        [DataMember]
        public int DeptID { get; set; } = 0;
        [DataMember]
        public string DeptName { get; set; } = string.Empty;
    }




    [DataContract]
    public class DepartmentListInfo
    {
        [DataMember]
        public List<DepartmentInfo> DepartmentInfoList { get; set; } = new List<DepartmentInfo>();
        [DataMember]
        public string Message { get; set; } = string.Empty;
        public int deptCount { get; set; } = 0;
    }




    [DataContract]
    public class RegistrationInfoClass
    {
        [DataMember]
        public List<RegistrationInfo> RegistrationInfoList { get; set; } = new List<RegistrationInfo>();

        [DataMember]
        public bool isEmpDetailsLoaded { get; set; }
      
        
        
    }

  
    [DataContract]
    public class RegistrationInfo
    {
        [DataMember]
        public string FirstName { get; set; } = string.Empty;
        [DataMember]
        public string LastName { get; set; } = string.Empty;
        [DataMember]
        public string EmailID { get; set; } = string.Empty;
        [DataMember]
        public string UserName { get; set; } = string.Empty;
        [DataMember]
        public string Password { get; set; } = string.Empty;
        [DataMember]
        
        public string Department { get; set; } = string.Empty;
        [DataMember]
        public string ResumeUpload { get; set; } = string.Empty;
        [DataMember]
        public string label { get; set; } = string.Empty;
        [DataMember]
        public string Gender { get; set; } = string.Empty;
        [DataMember]
        public string Address { get; set; } = string.Empty;
        [DataMember]
        public int EmpID { get; set; } = 0;
        [DataMember]
        public string MobileNumber { get; set; } = string.Empty;
        [DataMember]
        public string Status { get; set; } = string.Empty;
        [DataMember] 
        public int PageSize { get; set; } = 0;
        [DataMember]
        public int OffsetValue { get; set; } = 0;
        [DataMember]
        public string RejectedReason { get; set; } = string.Empty; 
        [DataMember]
        public string Role { get; set; } = string.Empty; 
       
        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public bool isAccept { get; set; }

        [DataMember]
        public bool isReject { get; set; }

   
        [DataMember]
        public bool isPending{ get; set; }

        [DataMember]
        public bool isTotal{ get; set; }

        [DataMember]
        public List<LanguageInfo> LanguagesList { get; set; } = new List<LanguageInfo>();

    }

    public class CountInfo
    {
        [DataMember]
        public int TotalCount { get; set; } = 0;
        [DataMember]
        public int AcceptedCount { get; set; } = 0;
        [DataMember]
        public int RejectedCount { get; set; } = 0;
        [DataMember]
        public int PendingCount { get; set; } = 0;
        [DataMember]
        public int DeptCount { get; set; } = 0; 
        [DataMember]
        public int HRCount { get; set; } = 0;


    }


    public class LanguageInfo
    {

        [DataMember]
        public int LangID { get; set; } = 0;
        [DataMember]
        public string LangName { get; set; } = string.Empty;

    }
    public class ErrorInfo
    {

        [DataMember]
        public int ErrorCode { get; set; } = 0;
        [DataMember]
        public string ErrorMessage { get; set; } = string.Empty;

    }

  

}