using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Repositories.Repositories
{
    public class GenericRepository<T, TKey> where T : IBaseEntity<TKey>
    {
        private readonly IMongoConnect _db;
        private readonly IMongoCollection<T> _collection;
        public GenericRepository(IMongoConnect db)
        {
            _db = db;
            _collection = GetDbCollection();
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            var cursor = await _collection.FindAsync(predicate);
            return await cursor.AnyAsync();
        }

        public IMongoQueryable<T> GetAll(
            Expression<Func<T, bool>> filter,
            Expression<Func<T, bool>> orderBy,
            int? pageSize,
            int? pageIndex)
        {
            var data = _collection.AsQueryable();

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
            var data = await _collection.Find(filter)
                            .Skip(skip)
                            .ToListAsync();
            return data;
        }

        public async Task<T> FindOne(Expression<Func<T, bool>> filter)
        {
            var data = await _collection.AsQueryable<T>().SingleOrDefaultAsync(filter);
            return data;
        }

        public async Task<long> CountAsync(Expression<Func<T, bool>> document)
        {
            var count = await _collection.CountAsync(document);
            return count;
        }

        public async Task InsertAsync(T document)
        {
            await _collection.InsertOneAsync(document);
        }

        public async Task InsertManyAsync(IEnumerable<T> entities)
        {
            await _collection.InsertManyAsync(entities);
        }

        public async Task UpdateAsync(
            ObjectId documentId,
            Expression<Func<T, bool>> document,
            object dataToUpdate)
        {
            var filter = Builders<T>.Filter.Eq("_id", documentId);
            var documentToUpdate = Builders<T>.Update.Set(document.ToString(), dataToUpdate);
            await _collection.UpdateOneAsync(filter, documentToUpdate);
        }

        public async Task<T> UpdateAsync(T entity)
        {
            await _collection.ReplaceOneAsync(x => x.Id.Equals(entity.Id), entity);
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            await DeleteAsync(entity.Id);
        }

        public async Task DeleteAsync(TKey id)
        {
            await _collection.DeleteOneAsync(x => x.Id.Equals(id));
        }

        public async Task DeleteManyAsync(Expression<Func<T, bool>> predicate)
        {
            await _collection.DeleteManyAsync(predicate);
        }

        private IMongoCollection<T> GetDbCollection()
        {
            var table = typeof(T).Name;
            return _db.GetConnection().GetCollection<T>(table);
        }
    }
}
