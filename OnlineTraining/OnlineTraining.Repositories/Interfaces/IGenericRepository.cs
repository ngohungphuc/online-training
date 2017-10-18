using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using OnlineTraining.Entities.Entities;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface IGenericRepository<T, in TKey> where T : IBaseEntity<TKey>
    {
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);

        Task<List<T>> GetAll();

        IMongoQueryable<T> GetAll(Expression<Func<T, bool>> filter, 
            Expression<Func<T, bool>> orderBy, 
            int? pageSize,
            int? pageIndex);

        Task<List<T>> Filter(Expression<Func<T, bool>> filter, int? skip = null);

        Task<T> FindOne(Expression<Func<T, bool>> filter);

        Task<long> CountAsync(Expression<Func<T, bool>> document);

        Task InsertAsync(T document);

        Task InsertManyAsync(IEnumerable<T> entities);

        Task UpdateAsync(
            ObjectId documentId,
            Expression<Func<T, bool>> document,
            object dataToUpdate);

        Task<T> UpdateAsync(T entity);

        Task DeleteAsync(T entity);

        Task DeleteAsync(TKey id);

        Task DeleteManyAsync(Expression<Func<T, bool>> predicate);
    }
}
