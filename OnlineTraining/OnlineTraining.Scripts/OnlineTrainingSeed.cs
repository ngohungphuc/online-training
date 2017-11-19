using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Config;
using OnlineTraining.Helper.Hash;

namespace OnlineTraining.Scripts
{
    public class OnlineTrainingSeed
    {
        private static readonly MongoClient client = new MongoClient("mongodb://localhost:27017");
        private static readonly IMongoDatabase database = client.GetDatabase("online-training");

        public static async Task AddUserToDb()
        {
            var repo = database.GetCollection<User>("Users");

            var userList = new List<User>
            {
                new User
                {
                    Email = "ngohungphuc95@gmail.com",
                    UserName = "phucngo",
                    Password = PasswordManager.Encrpyted("070695"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504c").ToString(),
                    AvatarUrl = "https://avatars0.githubusercontent.com/u/13591213?s=460&v=4"
                },
                new User
                {
                    Email = "ngohungphuc7695@gmail.com",
                    UserName = "phucngo1",
                    Password = PasswordManager.Encrpyted("070695"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504d").ToString(),
                    AvatarUrl = "https://avatars0.githubusercontent.com/u/13591213?s=460&v=4"
                }
            };

            foreach (var user in userList)
            {
                var matchedProfile = repo.Find(x => x.Id == user.Id).Count();
                if (matchedProfile == 0)
                    await repo.InsertManyAsync(userList);
            }
        }

        public static async Task AddLearningPath()
        {
            var pathCollection = database.GetCollection<LearningPath>("LearningPaths");
            var pathList = new List<LearningPath>
            {
                new LearningPath
                {
                    Id = new ObjectId("5a01de5f990092a25640e1e6").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "Microsoft Azure for Developers",
                    PathIcon = "path/azure-blue.png",
                    TotalCourses = 2,
                    Slug = "Microsoft-Azure-for-Developers",
                    LearningPathDescription = "This path is intended for those who would like to learn about Azure services and practices that will enable you to build scalable, highly available and performant applications. This path will demonstrate how to leverage Azure for common capabilities and plumbing, so that you can focus on building things that matter."
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01de86990092a25640e1f2").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "Angular",
                    PathIcon = "path/angular.png",
                    TotalCourses = 0,
                    Slug = "Angular"
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01de8c990092a25640e1f8").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "ASP.Net MVC",
                    PathIcon = "path/asp-dot-net.png",
                    TotalCourses = 1,
                    Slug = "ASP.Net-MVC",
                    LearningPathDescription = "MVC is an architectural pattern that separates applications into three components: the model, the view, and the controller. ASP.NET MVC 5 provides this functionality to the ASP.NET framework as an alternative to the WebForms pattern. You’ll love working with this highly-testable and lightweight framework!"
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01f9a7990092a25640ebcc").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "C#",
                    PathIcon = "path/csharp.png",
                    TotalCourses = 0,
                    Slug = "CSharp"
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01f9a7990092a25640ebcd").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "Html5",
                    PathIcon = "path/html5.png",
                    TotalCourses = 0,
                    Slug = "html5"
                }
            };

            foreach (var path in pathList)
            {
                var matchedProfile = pathCollection.Find(x => x.Id == path.Id).Count();
                if (matchedProfile == 0)
                    await pathCollection.InsertManyAsync(pathList);
            }
        }

        public static async Task AddCourse()
        {
            var courseCollection = database.GetCollection<Course>("Courses");
            var courseList = new List<Course>
            {
                new Course
                {
                    Id = new ObjectId("5a01de93990092a25640e1fc").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseName = "Microsoft Azure: The Big Picture",
                    CreatedBy = "Matt Milner",
                    ShortDescription =
                        "This course is intended to help technology professionals gain an understanding of Microsoft's cloud platform. The goal in building this course was to provide enough information to get a sense of the platform and what it can do. Follow up this course by diving into other courses that focus on specific Azure offerings and technologies to deepen your knowledge and tackle specific challenges.",
                    TargetAudience = "Beginner",
                    LearningPathId = "5a01de5f990092a25640e1e6"

                },
                new Course
                {
                    Id = new ObjectId("5a05e27297a1606f748eb075").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseName = "Introduction to Azure App Services",
                    CreatedBy = "Barry Luijbregts",
                    ShortDescription =
                        "This course will teach you the fundamentals of using the Azure App Services Platform to build and deploy apps at scale.",
                    TargetAudience = "Beginner",
                    LearningPathId = "5a01de5f990092a25640e1e6"

                },
                new Course
                {
                    Id = new ObjectId("5a01de98990092a25640e1fe").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseName = "A Comparison of Microsoft Web Technologies",
                    CreatedBy = "Michael Palermo",
                    ShortDescription =
                        "Before engaging in any web development project using the Microsoft web platform, a thorough knowledge of the technology options available is key to choosing the right path. In this course, A Comparison of Web Technologies, you will learn how to evaluate the strengths and challenges of each web technology, and determine which is best aligned with needs of developer. You will get to compare Web Forms, Web Pages, and MVC with each other using similar demos to showcase unique approaches. You will also get an understanding of how ASP.NET Core compares with the full ASP.NET framework. When you are finished with this course, you will have the ability to make a strategic choice as to which Microsoft web technology is best for you!",
                    TargetAudience = "Beginner",
                    LearningPathId = "5a01de8c990092a25640e1f8"
                }
            };

            foreach (var course in courseList)
            {
                var matchedProfile = courseCollection.Find(x => x.Id == course.Id).Count();
                if (matchedProfile == 0)
                    await courseCollection.InsertManyAsync(courseList);
            }
        }

        public static async Task AddCourseDetail()
        {
            var courseDetailCollection = database.GetCollection<CourseDetail>("CourseDetails");
            var courseDetailList = new List<CourseDetail>
            {
                //parent module
                new CourseDetail
                {
                    Id = new ObjectId("5a0aada4d6e344327b9390a2").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc").ToString(),
                    CourseMediaId = "",
                    ModuleId = "",
                    Order = 1,
                    Title = "Introduction"
                },
                //child module
                new CourseDetail
                {
                    Id = new ObjectId("5a01e86f990092a25640e562").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc").ToString(),
                    CourseMediaId = new ObjectId("5a0aade86857fdea6cb47947").ToString(),
                    ModuleId = new ObjectId("5a0aada4d6e344327b9390a2").ToString(),
                    Title = "Course Overview"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a0aadd7429b1dd2742b9b35").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc").ToString(),
                    CourseMediaId = "",
                    ModuleId = "",
                    Order = 2,
                    Title = "Introduction"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a01e875990092a25640e566").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc").ToString(),
                    CourseMediaId = new ObjectId("5a0aadb467cc358b200419d7").ToString(),
                    ModuleId = new ObjectId("5a0aadd7429b1dd2742b9b35").ToString(),
                    Title = "Microsoft Azure: The Big Picture"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a0be4d4a0e56051fe1465fd").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc").ToString(),
                    CourseMediaId = new ObjectId("5a0be4db4f5eb939edc60a2b").ToString(),
                    ModuleId = new ObjectId("5a0aadd7429b1dd2742b9b35").ToString(),
                    Title = "Microsoft Azure: The Big Picture - Part 2"
                },

                new CourseDetail
                {
                    Id = new ObjectId("5a01e88c990092a25640e56c").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de98990092a25640e1fe").ToString(),
                    CourseMediaId = "",
                    ModuleId = "",
                    Order = 1,
                    Title = "Overview"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a0ab150c2859eecbc6b75e2").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de98990092a25640e1fe").ToString(),
                    CourseMediaId = new ObjectId("5a0ab1170632adb2ffae88ba").ToString(),
                    ModuleId = new ObjectId("5a01e88c990092a25640e56c").ToString(),
                    Title = "Course Overview"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a0ab16c3812b9c8aa69448e").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de98990092a25640e1fe").ToString(),
                    CourseMediaId = "",
                    ModuleId = "",
                    Order = 2,
                    Title = "Introduction"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a01e891990092a25640e570").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de98990092a25640e1fe").ToString(),
                    CourseMediaId = new ObjectId("5a0ab184c66268be44baf703").ToString(),
                    Title = "An Introduction to the Microsoft Web Platform",
                    ModuleId = new ObjectId("5a0ab16c3812b9c8aa69448e").ToString()
                }
            };

            foreach (var courseDetail in courseDetailList)
            {
                var matchedProfile = courseDetailCollection.Find(x => x.Id == courseDetail.Id).Count();
                if (matchedProfile == 0)
                    await courseDetailCollection.InsertManyAsync(courseDetailList);
            }
        }

        public static async Task AddCourseMedia()
        {
            var mediaCollection = database.GetCollection<CourseMedia>("CourseMedias");
            var mediaList = new List<CourseMedia>
            {
                new CourseMedia
                {
                    Id = new ObjectId("5a0aade86857fdea6cb47947").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    BlobUrl = "19_Y3M4OKu2Eeblu8CdUOOh1--1xlkqKB",
                    CourseDetailId = new ObjectId("5a01e86f990092a25640e562").ToString(),
                    ThumbnailUrl = ""
                },
                new CourseMedia
                {
                    Id = new ObjectId("5a0aadb467cc358b200419d7").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    BlobUrl = "1oqOYhetKmOUuRUlrGty2U5Yxjk8HO-sl",
                    CourseDetailId = new ObjectId("5a01e875990092a25640e566").ToString(),
                    ThumbnailUrl = ""
                },
                new CourseMedia
                {
                    Id = new ObjectId("5a0be4db4f5eb939edc60a2b").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    BlobUrl = "18lOL4ZUnOtrgrO1JRz-Q5rhMG4zYPAPe",
                    CourseDetailId = new ObjectId("5a0be4d4a0e56051fe1465fd").ToString(),
                    ThumbnailUrl = ""
                }
            };
            foreach (var media in mediaList)
            {
                var matchedProfile = mediaCollection.Find(x => x.Id == media.Id).Count();
                if (matchedProfile == 0)
                    await mediaCollection.InsertManyAsync(mediaList);
            }
        }
        public static async Task AddBookmark()
        {
            var bookmarkCollection = database.GetCollection<Bookmark>("Bookmarks");
            var bookmarkList = new List<Bookmark>
            {
                new Bookmark
                {
                    Id = new ObjectId("5a090967ee25633fd44ee1d2").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    UserId = "59ee1ba3acf7c53bf4d2504c",
                    CourseId = "5a01de93990092a25640e1fc"
                },
                new Bookmark
                {
                    Id = new ObjectId("5a095a1eed40c73e701c4133").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    UserId = "59ee1ba3acf7c53bf4d2504c",
                    CourseId = "5a05e27297a1606f748eb075"
                },
                new Bookmark
                {
                    Id = new ObjectId("5a095b26ed40c73e701c4134").ToString(),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    UserId = "59ee1ba3acf7c53bf4d2504c",
                    CourseId = "5a01de93990092a25640e1fc"
                }
            };
            foreach (var bookmark in bookmarkList)
            {
                var matchedProfile = bookmarkCollection.Find(x => x.Id == bookmark.Id).Count();
                if (matchedProfile == 0)
                    await bookmarkCollection.InsertManyAsync(bookmarkList);
            }
        }
    }
}