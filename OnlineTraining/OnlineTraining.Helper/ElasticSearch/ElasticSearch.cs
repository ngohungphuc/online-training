using System;
using System.Linq;
using Elasticsearch.Net;
using Microsoft.Extensions.Configuration;
using Nest;

namespace OnlineTraining.Helper.ElasticSearch
{
    public class ElasticSearch: IElasticSearch
    {
        private readonly string[] _elasticSearchUrls;
        private readonly string _coursesIndex;

        public ElasticSearch(IConfiguration configuration)
        {
            _elasticSearchUrls = configuration["ElasticSearch:ElasticSearchUrls"].Split(';');
            _coursesIndex = configuration["ElasticSearch:Index:Courses"];
        }


        public ElasticClient CreateEalsticSearchClient()
        {
            var uris = _elasticSearchUrls.Select(url => new Uri(url)).ToList();

            var connectionPool = new SniffingConnectionPool(uris);
            var settings = new ConnectionSettings(connectionPool);
            var client = new ElasticClient(settings);

            return client;
        }
    }
}
