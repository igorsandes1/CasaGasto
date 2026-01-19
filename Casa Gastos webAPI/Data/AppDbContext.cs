using Casa_Gastos_webAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Data
{

    // Configuracao do banco de dados
    public class AppDbContext : DbContext
    {

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Pessoas> pessoas { get; set; } //Representa a tabela do db (pessoas)
    public DbSet<Categorias> categorias { get; set; } //Representa a tabela do db (categorias)
    public DbSet<Transacoes> transacoes { get; set; } //Representa a tabela do db (transacoes)


    }
}
