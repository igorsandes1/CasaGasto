using System.Collections;
using Casa_Gastos_webAPI.Data;
using Casa_Gastos_webAPI.DTOs;
using Casa_Gastos_webAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Controllers
{
    [ApiController]
    [Route("api/categorias")] //Rota base de "Categorias"
    public class CategoriasController : ControllerBase
    {

        private readonly AppDbContext _context; //Reponsavel pelo acesso ao banco de dados.

        //Injecao de dependencia do DbContext
        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        //GET api/categorias (Faz um select em toda a base de pessoas)
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? finalidade) { //utlizando query string, para passar o valor da finalidade caso seja especifica

            if (finalidade == "Ambas")
            { //filtrando todas as categorias (caso finalidade seja Ambas)
                var todasCategorias = await _context.categorias.ToListAsync();
                return Ok(todasCategorias); //retorno 200
            }
            //filtrando a categoria desejado pelo query string
            var filtroCategorias = await _context.categorias.Where(b => b.Target == finalidade).ToListAsync();
            return Ok(filtroCategorias); //retorno 200

        }

        //POST api/categorias/create (Criacao de uma nova categoria)
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] CreateCategoryDb dto)
        {

            if (dto == null) return BadRequest("O body da request veio vázio"); //Evita o body vir vázio

            var novaCategoria = new Categorias
            {

                Id = Guid.NewGuid(), //geracao de id
                Description = dto.Description, //descricao da categoria
                Target = dto.Target, //finalidade da categoria
                Created_At = DateTime.UtcNow //horario local

            };

            _context.categorias.Add(novaCategoria); //adiciona a pessoa ao context
            await _context.SaveChangesAsync(); //salva no banco de dados

            return CreatedAtAction(nameof(Get), new { id = novaCategoria.Id }, novaCategoria); //retorno 201 (categoria criada)

        }

        //GET api/categorias/totais
        [HttpGet("totais")]
        public async Task<IActionResult> GetTotais()
        {

        var categorias = await _context.categorias.ToListAsync();
        var arrayTotais = new List<Totais>(); //cria um array (por enquanto vázio)

        decimal totalReceitaGeral = 0; //soma total para a receita
        decimal totalDespesaGeral = 0; //soma total para a despesa

        foreach (var categoria in categorias) //loop para verificar categorias individualmente
            {
         var totalReceitas = await _context.transacoes.Where(b => b.Category == categoria.Id && categoria.Target.ToLower() == "receita").SumAsync(b => b.Value); //finda na tabela de transacoes por id e pelas receitas e no final soma os valores
                var totalDespesas = await _context.transacoes.Where(b => b.Category == categoria.Id && categoria.Target.ToLower() == "despesa").SumAsync(b => b.Value); //finda na tabela de transacoes por id e pelas receitas e no final soma os valores

                //criando o objeto para ser implementado ao arrayTotais
                var itemCategoria = new Totais
                {

                    Id = categoria.Id,
                    Name = categoria.Description,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = totalReceitas - totalDespesas

                };

                //somando para o geral
                totalReceitaGeral += totalReceitas;
                totalDespesaGeral += totalDespesas;

                arrayTotais.Add(itemCategoria); //implementando o objeto acima

            }

            //criando o objeto de resposta com os totais individuais e o total geral logo em seguida
            var resultado = new
            {
                individual = arrayTotais,
                geral = new
                {
                    TotalReceitas = totalReceitaGeral,
                    TotalDespesa = totalDespesaGeral,
                    TotalSaldo = totalReceitaGeral - totalDespesaGeral
                }

            };

            return Ok(resultado); //retorno 200
        }

    }
}
