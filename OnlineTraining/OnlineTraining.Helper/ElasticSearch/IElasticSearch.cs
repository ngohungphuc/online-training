using Elasticsearch.Net;
using Nest;
namespace OnlineTraining.Helper.ElasticSearch
{
    public interface IElasticSearch
    {
        ElasticClient CreateEalsticSearchClient();
    }
}