using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class checkController : ControllerBase
    {
        private readonly IMethods _Methods;
        private readonly AppDbContext _appDbContext;

        public checkController(IMethods method, AppDbContext appDbContext)
        {
            _Methods = method;
            _appDbContext = appDbContext;
        }
        [HttpGet("{email}")]
        public async Task<ActionResult<employee>> checker(string email)
        {
            employee le = _appDbContext.Employee.FirstOrDefault(x => x.email == email);

            if (le == null)
            {
                return le;
            }

            return le;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<employeeleavemapping>> DeleteEmployee(int id)
        {
            employeeleavemapping emp = _appDbContext.EmployeeLeaveMapping.FirstOrDefault(x => x.employeeId == id);
            if (emp == null)
            {
                return NotFound();
            }

            _appDbContext.EmployeeLeaveMapping.Remove(emp);
            await _appDbContext.SaveChangesAsync();

            return emp;
        }

    }
}