using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class EmployeeLeaveController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public EmployeeLeaveController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        [HttpGet]
        public async Task<IEnumerable<employeeleavemapping>> AllEmployee()
        {

            return await _appDbContext.EmployeeLeaveMapping.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<employeeleavemapping>> AddEmployeeLeave(employeeleavemapping employeeleavemapping)
        {
            _appDbContext.EmployeeLeaveMapping.Add(employeeleavemapping);
            await _appDbContext.SaveChangesAsync();
            return null;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, employeeleavemapping emp)
        {
            if (id != emp.id)
            {
                return BadRequest();
            }
            _appDbContext.Entry(emp).State = EntityState.Modified;

            try
            {
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!check(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<employeeleavemapping>> DeleteEmployee(int id)
        {
            employeeleavemapping emp = _appDbContext.EmployeeLeaveMapping.FirstOrDefault(x => x.leaveId == id);
            if (emp == null)
            {
                return NotFound();
            }

            _appDbContext.EmployeeLeaveMapping.Remove(emp);
            await _appDbContext.SaveChangesAsync();

            return emp;
        }



            private bool check(int id)
        {
            return _appDbContext.EmployeeLeaveMapping.Any(e => e.id == id);
        }

    }
}