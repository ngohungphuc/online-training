using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineTraining.Entities.Auth
{
    public class RToken
    {
        [Column("id")]
        [Key]
        public string Id { get; set; }

        [Column("client_name")]
        public string ClientName { get; set; }

        [Column("refresh_token")]
        public string RefreshToken { get; set; }

        [Column("isstop")]
        public int IsStop { get; set; }
    }
}