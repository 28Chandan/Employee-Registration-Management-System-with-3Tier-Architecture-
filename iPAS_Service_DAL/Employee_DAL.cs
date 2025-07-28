using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Common;
using System.Data;
using System.Data.Common;

namespace iPAS_Service_DAL
{
     public class Employee_DAL
    {// to load the employees in employee page ,,, 
     
        //update quaries, here i have updated if an employee upadates his data via his page
        public static int updateEmployeeData(Database db, DbTransaction transaction, 
            string firstName, string lastName, string emailID, string department, 
            string mobileNumber, string address, string gender, int empID)
        {

            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("UPDATE EMPLOYEES2 SET FIRSTNAME = @FIRSTNAME, LASTNAME = @LASTNAME,  ");
            sqlCmdBuilder.Append("EMAILID = @EMAILID, DEPARTMENT = @DEPARTMENT,MOBILENUMBER = @MOBILENUMBER, ");
            sqlCmdBuilder.Append("ADDRESS= @ADDRESS,  GENDER = @GENDER WHERE EMPID = @EMPID ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@FIRSTNAME", DbType.AnsiString, firstName);
            db.AddInParameter(dbCmd, "@LASTNAME", DbType.AnsiString, lastName);
            db.AddInParameter(dbCmd, "@EMAILID", DbType.AnsiString, emailID);
            db.AddInParameter(dbCmd, "@DEPARTMENT", DbType.AnsiString, department);
            db.AddInParameter(dbCmd, "@MOBILENUMBER", DbType.AnsiString, mobileNumber);
            db.AddInParameter(dbCmd, "@ADDRESS", DbType.AnsiString, address);
            db.AddInParameter(dbCmd, "@GENDER", DbType.AnsiString, gender);
            db.AddInParameter(dbCmd, "@EMPID", DbType.AnsiString, empID);
            return db.ExecuteNonQuery(dbCmd, transaction);

        }

        // to load all the languages selected by employee in employee page
        public static IDataReader SelectedLanguages(Database db, int empId)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT FLANG_ID FROM LDB1_MULTI_LANGUAGES WHERE FEMP_ID = @EMPID ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@EMPID", DbType.Int32, empId);
            return db.ExecuteReader(dbCmd);
        }

        //when the user modifies the languages he learned in employee page
        //also when the hr deletes any perticular employee
        public static bool DeleteSelectedLang(Database db, DbTransaction transaction, int empID,string status)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("DELETE FROM LDB1_MULTI_LANGUAGES WHERE FEMP_ID = @EMPID ");
            //sqlCmdBuilder.Append("UPDATE LDB1_MULTI_LANGUAGES SET FSTATUS =@FSTATUS WHERE FEMP_ID = @EMPID ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
           db.AddInParameter(dbCmd, "@EMPID", DbType.Int32, empID);
            db.ExecuteNonQuery(dbCmd, transaction);
            return true;
        }

     }
}
