using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiSite.Models
{
    public class Tarefa
    {
        
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? DataInicio { get; set; }
        public string? DataFim { get; set; }
        public int IdPessoa { get; set; }
        
    }
}