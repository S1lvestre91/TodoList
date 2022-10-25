using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ApiSite.Models
{
    public class Contextos : DbContext
    {
        public Contextos (DbContextOptions<Contextos> options): base (options){

        }

        public DbSet<Pessoa>? Pessoa {get;set;}
        public DbSet<Tarefa>? Tarefa {get;set;}
        
    }
}