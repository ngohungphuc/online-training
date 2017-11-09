using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using OnlineTraining.Entities.Db;
using OnlineTraining.Entities.Entities;
using OnlineTraining.Helper.Hash;

namespace OnlineTraining.Scripts
{
    public class OnlineTrainingSeed
    {
        private static readonly MongoConnect mongoConnect = new MongoConnect();

        public static async Task AddUserToDb()
        {
            var repo = mongoConnect.GetConnection().GetCollection<User>("Users");

            var userList = new List<User>
            {
                new User
                {
                    Email = "ngohungphuc95@gmail.com",
                    UserName = "phucngo",
                    Password = PasswordManager.Encrpyted("070695"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504c"),
                    AvatarUrl = "https://avatars0.githubusercontent.com/u/13591213?s=460&v=4"
                },
                new User
                {
                    Email = "ngohungphuc7695@gmail.com",
                    UserName = "phucngo1",
                    Password = PasswordManager.Encrpyted("070695"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Id = new ObjectId("59ee1ba3acf7c53bf4d2504d"),
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
            var pathCollection = mongoConnect.GetConnection().GetCollection<LearningPath>("LearningPaths");
            var pathList = new List<LearningPath>
            {
                new LearningPath
                {
                    Id = new ObjectId("5a01de5f990092a25640e1e6"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "Microsoft Azure for Developers",
                    PathIcon = "path/azure-blue.png",
                    TotalCourses = 1,
                    Slug = "Microsoft-Azure-for-Developers"
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01de86990092a25640e1f2"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "Angular",
                    PathIcon = "path/angular.png",
                    TotalCourses = 0,
                    Slug = "Angular"
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01de8c990092a25640e1f8"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "ASP.Net MVC",
                    PathIcon = "path/asp-dot-net.png",
                    TotalCourses = 1,
                    Slug = "ASP.Net-MVC"
                },
                new LearningPath
                {
                    Id = new ObjectId("5a01f9a7990092a25640ebcc"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    Name = "C#",
                    PathIcon = "path/csharp.png",
                    TotalCourses = 0,
                    Slug = "CSharp"
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
            var courseCollection = mongoConnect.GetConnection().GetCollection<Course>("Courses");
            var courseList = new List<Course>
            {
                new Course
                {
                    Id = new ObjectId("5a01de93990092a25640e1fc"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseName = "Microsoft Azure: The Big Picture",
                    CreatedBy = "Matt Milner",
                    ShortDescription =
                        "This course is intended to help technology professionals gain an understanding of Microsoft's cloud platform. The goal in building this course was to provide enough information to get a sense of the platform and what it can do. Follow up this course by diving into other courses that focus on specific Azure offerings and technologies to deepen your knowledge and tackle specific challenges.",
                    TargetAudience = "Beginner",
                    LearningPathId = "5a01de5f990092a25640e1e6",
                    LearningPathDescription = "This path is intended for those who would like to learn about Azure services and practices that will enable you to build scalable, highly available and performant applications. This path will demonstrate how to leverage Azure for common capabilities and plumbing, so that you can focus on building things that matter."
                },
                new Course
                {
                    Id = new ObjectId("5a01de98990092a25640e1fe"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseName = "A Comparison of Microsoft Web Technologies",
                    CreatedBy = "Michael Palermo",
                    ShortDescription =
                        "Before engaging in any web development project using the Microsoft web platform, a thorough knowledge of the technology options available is key to choosing the right path. In this course, A Comparison of Web Technologies, you will learn how to evaluate the strengths and challenges of each web technology, and determine which is best aligned with needs of developer. You will get to compare Web Forms, Web Pages, and MVC with each other using similar demos to showcase unique approaches. You will also get an understanding of how ASP.NET Core compares with the full ASP.NET framework. When you are finished with this course, you will have the ability to make a strategic choice as to which Microsoft web technology is best for you!",
                    TargetAudience = "Beginner",
                    LearningPathId = "5a01de8c990092a25640e1f8",
                    LearningPathDescription = "MVC is an architectural pattern that separates applications into three components: the model, the view, and the controller. ASP.NET MVC 5 provides this functionality to the ASP.NET framework as an alternative to the WebForms pattern. You’ll love working with this highly-testable and lightweight framework!"
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
            var courseDetailCollection = mongoConnect.GetConnection().GetCollection<CourseDetail>("CourseDetails");
            var courseDetailList = new List<CourseDetail>
            {
                new CourseDetail
                {
                    Id = new ObjectId("5a01e86f990092a25640e562"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc"),
                    CourseMediaId = new ObjectId(),
                    Title = "Course Overview"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a01e875990092a25640e566"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de93990092a25640e1fc"),
                    CourseMediaId = new ObjectId(),
                    Title = "Microsoft Azure: The Big Picture"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a01e88c990092a25640e56c"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de98990092a25640e1fe"),
                    CourseMediaId = new ObjectId(),
                    Title = "Course Overview"
                },
                new CourseDetail
                {
                    Id = new ObjectId("5a01e891990092a25640e570"),
                    CreatedDate = DateTime.Now,
                    ModifieddDate = DateTime.Now,
                    CourseId = new ObjectId("5a01de98990092a25640e1fe"),
                    CourseMediaId = new ObjectId(),
                    Title = "An Introduction to the Microsoft Web Platform"
                }
            };

            foreach (var courseDetail in courseDetailList)
            {
                var matchedProfile = courseDetailCollection.Find(x => x.Id == courseDetail.Id).Count();
                if (matchedProfile == 0)
                    await courseDetailCollection.InsertManyAsync(courseDetailList);
            }
        }
    }
}