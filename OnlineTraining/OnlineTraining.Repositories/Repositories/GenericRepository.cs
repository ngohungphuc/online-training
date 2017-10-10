using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using OnlineTraining.Entities.Db;

namespace OnlineTraining.Repositories.Repositories
{
    public class GenericRepository<T> where T : class
    {
        private readonly IMongoConnect _db;

        public GenericRepository(IMongoConnect db)
        {
            _db = db;
        }

        public IMongoQueryable<T> GetAll(
            Expression<Func<T, bool>> filter,
            Expression<Func<T, bool>> orderBy,
            int? pageSize,
            int? pageIndex)
        {
            var collection = GetDbCollection();
            var data = collection.AsQueryable();

            if (filter != null)
            {
                data.Where(filter);
            }

            if (orderBy != null)
            {
                data.OrderBy(orderBy);
            }

            if (pageSize != null && pageIndex != null)
            {
                data.Skip((pageIndex.Value - 1) * pageSize.Value).Take(pageSize.Value);
            }

            return data;
        }

        public async Task<List<T>> Filter(Expression<Func<T, bool>> filter, int? skip = null)
        {
            var collection = GetDbCollection();
            var data = await collection.Find(filter)
                            .Skip(skip)
                            .ToListAsync();
            return data;
        }

        public async Task<T> FindOne(Expression<Func<T, bool>> filter)
        {
            var collection = GetDbCollection();
            var data = await collection.AsQueryable<T>().SingleOrDefaultAsync(filter);
            return data;
        }

        public async Task<T> Where(Expression<Func<T, bool>> filter)
        {
            var collection = GetDbCollection();
            var data = await collection.AsQueryable<T>().SingleOrDefaultAsync(filter);

            return data;
        }

        public async Task<long> CountAsync(Expression<Func<T, bool>> document)
        {
            var collection = GetDbCollection();
            var count = await collection.CountAsync(document);
            return count;
        }

        public async Task InsertAsync(T document)
        {
            var collection = GetDbCollection();
            await collection.InsertOneAsync(document);
        }

        public async Task UpdateAsync(
            ObjectId documentId,
            Expression<Func<T, bool>> document,
            object dataToUpdate)
        {
            var collection = GetDbCollection();
            var filter = Builders<T>.Filter.Eq("_id", documentId);
            var documentToUpdate = Builders<T>.Update.Set(document.ToString(), dataToUpdate);
            await collection.UpdateOneAsync(filter, documentToUpdate);
        }

        public async Task DeleteAsync(ObjectId documentId)
        {
            var collection = GetDbCollection();
            var filter = Builders<T>.Filter.Eq("_id", documentId);
            await collection.DeleteOneAsync(filter);
        }

        private IMongoCollection<T> GetDbCollection()
        {
            var table = typeof(T).Name;
            return _db.GetConnection().GetCollection<T>(table);
        }
    }
}
