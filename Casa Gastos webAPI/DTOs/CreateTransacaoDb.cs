using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreateTransacaoDb
    {
        [Required(ErrorMessage = "Descricao é obrigatória")] //Deixando a descricao como obrigatória
        [MaxLength(100, ErrorMessage = "Limite da caractéres atigindo (100)")] //limitando a quantidade de caractéres conforme o banco
        public string Description { get; set; }
        [Required(ErrorMessage = "Valor é obrigatório")] //Deixando o valor como obrigatório
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero")] // definindo o range do decimal (de 0.01 até o valor máximo do double)
        public decimal Value { get; set; }
        [Required(ErrorMessage = "Finalidade é obrigatória")] //Deixando a finalidade como obrigatória
        [MaxLength(50, ErrorMessage = "Limite da caractéres atigindo (50)")] //limitando a quantidade de caractéres conforme o banco
        public string Target { get; set; }
        [Required(ErrorMessage = "Categoria é obrigatória")] //Deixando a categoria como obrigatória
        public Guid Category { get; set; }
        [Required(ErrorMessage = "Pessoa é obrigatória")] //Deixando a pessoa como obrigatório
        public Guid Owner { get; set; }
    }
}
