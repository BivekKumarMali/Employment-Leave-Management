using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public class Methods : IMethods
    {
        private readonly AppDbContext _appDbContext;

        public Methods(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public IEnumerable<employee> AllEmployees
        {
            get
            {
                return _appDbContext.Employee;
            }
        }
        public IEnumerable<leave> AllLeaves
        {
            get
            {
                return _appDbContext.Leave;
            }
        }
        public IEnumerable<employeeleavemapping> AllEmployeeLeave
        {
            get
            {
                return _appDbContext.EmployeeLeaveMapping;
            }
        }

        public IEnumerable<employeeleavemapping> GetLeaveByEmployeeId(int Id)
        {
            IEnumerable<employeeleavemapping> comm = from u in _appDbContext.EmployeeLeaveMapping
                                       where u.employeeId == Id
                                       select u;
            return comm;

        }
        public employee GetEmployeeByEmail(string email)
        {
            return _appDbContext.Employee.FirstOrDefault(p => p.email == email);
        }

    }
}
