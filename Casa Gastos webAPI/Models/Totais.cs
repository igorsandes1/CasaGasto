namespace Casa_Gastos_webAPI.Models
{
    public class Totais
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }
}
