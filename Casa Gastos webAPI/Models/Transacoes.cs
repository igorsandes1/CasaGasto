namespace Casa_Gastos_webAPI.Models
{
    public class Transacoes
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public string Target { get; set; }
        public Guid Category { get; set; }
        public Guid Owner { get; set; }
        public DateTime? Created_At { get; set; }
    }
}
