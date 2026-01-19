using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreateTransacaoDb
    {
        [Required(ErrorMessage = "Descricao é obrigatória")]
        [MinLength(1, ErrorMessage = "Descricao está vázia")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Valor é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero")] // definindo o range do decimal (de 0.01 até o valor máximo do double)
        public decimal Value { get; set; }
        [Required(ErrorMessage = "Finalidade é obrigatória")]
        [MinLength(1, ErrorMessage = "Finalidade está vázia")]
        public string Target { get; set; }
        [Required(ErrorMessage = "Categoria é obrigatória")]
        [MinLength(1, ErrorMessage = "Categoria está vázia")]
        public string Category { get; set; }
        [Required(ErrorMessage = "Pessoa é obrigatória")]
        [MinLength(1, ErrorMessage = "Pessoa está vázia")]
        public string Owner { get; set; }
    }
}
