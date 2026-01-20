using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreatePessoaDb
    {
        [Required(ErrorMessage = "Nome obrigatório")] //Deixando o nome como obrigatório
        public string Name { get; set; }
        [Required(ErrorMessage = "Data de nascimento obrigatório")] //Deixando a data de nascimento como obrigatória
        public DateOnly DateBirth { get; set; }
    }
}
