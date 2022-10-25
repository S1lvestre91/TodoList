using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiSite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController: ControllerBase
    {
        public readonly Contextos _contextos;

        public PessoaController(Contextos contextos){

            _contextos = contextos;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAll(){

            return await _contextos.Pessoa.ToListAsync();
        }
        [HttpGet("id")]
        public async Task<ActionResult<Pessoa>> GetId(int Id){

            Pessoa pessoa = await _contextos.Pessoa.FindAsync(Id);

            if(pessoa == null){
                return NotFound();
            }
            return pessoa;
        }
        [HttpPost]
        public async Task<ActionResult<Pessoa>> AddPessoa(Pessoa pessoa){
            await _contextos.Pessoa.AddAsync(pessoa);
            await _contextos.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("id")]
        public async Task<ActionResult<Pessoa>> UpdatePessoa(int Id, Pessoa pessoa){
            if(Id != pessoa.Id){
                return NotFound();
            }
           _contextos.Entry(pessoa).State = EntityState.Modified;

            await _contextos.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int Id){
            var pessoa = await _contextos.Pessoa.FindAsync(Id);
            if(pessoa == null){
                return BadRequest();
            }

            _contextos.Pessoa.Remove(pessoa);
            await _contextos.SaveChangesAsync();
            return Ok();
        }
    }
}