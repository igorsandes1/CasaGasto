using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreateCategoryDb
    {
        [Required(ErrorMessage = "Descrição é obrigatória")] //Deixando a descricao como obrigatória
        [MaxLength(100, ErrorMessage = "Limite da caractéres atigindo (100)")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Finalidade é obrigatória")] //Deixando a finalidade como obrigatória
        [MaxLength(50, ErrorMessage = "Limite da caractéres atigindo (50)")]
        public string Target { get; set; }
    }
}
