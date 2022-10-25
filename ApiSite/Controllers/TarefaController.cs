using System.Net;
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
    public class TarefaController : ControllerBase
    {
        public readonly Contextos _contextos;

        public TarefaController (Contextos contextos){
            _contextos = contextos;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetAll(){

            return await _contextos.Tarefa.ToListAsync();
        }
        [HttpGet("id")]
        public async Task<ActionResult<Tarefa>> GetId(int Id){
            Tarefa tarefa = await _contextos.Tarefa.FindAsync(Id);

            if(tarefa == null){
                return NotFound();
            }

            return tarefa;
        }
        [HttpPost]
        public async Task<ActionResult<Tarefa>> AddTarefa(Tarefa tarefa){

            await _contextos.Tarefa.AddAsync(tarefa);
            await _contextos.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("id")]
        public async Task<ActionResult<Tarefa>> UpdateTarefa(int Id, Tarefa tarefa){

            if(Id != tarefa.Id){
                return BadRequest();
            }
            _contextos.Entry(tarefa).State = EntityState.Modified;

            await _contextos.SaveChangesAsync();
            return Ok();

        }
        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int Id){

            Tarefa tarefa = await _contextos.Tarefa.FindAsync(Id);

            if(tarefa == null){
                return NotFound();
            }
            _contextos.Tarefa.Remove(tarefa);
            await _contextos.SaveChangesAsync();

            return Ok();
        }
    }
}