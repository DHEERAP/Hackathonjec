









// // jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const _ = require("lodash");
// const app = express();

// const homeStartingContent = "L";
// const aboutContent = "tdui.";
// const contactContent = "ro.";``

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// const uri = 'mongodb://127.0.0.1:27017';
// const databaseName = "blogDB";

// async function connect() {
//   try {
//     await mongoose.connect(uri + '/' + databaseName, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB server is started");

//     const postSchema = {   /// schema
//       title: String,
//       content: String
//     };

//     const Post = mongoose.model('Post', postSchema); ///model


//      app.get("/", function(req, res) {
//       try {
//     Post.find({}, function(err, posts) {
//       if (err) {
//         console.error(err); // Add this line to log the error
//         res.status(500).send("An error occurred while retrieving the posts.");
//         return;
//       }
//       res.render("home", {
//         startingContent: homeStartingContent,
//         posts: posts
//       });
//     });
    
//       } catch (error) {
//         res.status(500).send("An error occurred while retrieving the posts.");
//       }
//     });


//     app.get("/about", function(req, res) {
//       try {
//         res.render("about", { aboutContent: aboutContent });
//       } catch (error) {
//         res.status(500).send("An error occurred while rendering the about page.");
//       }
//     });

//     app.get("/contact", function(req, res) {
//       try {
//         res.render("contact", { contactContent: contactContent });
//       } catch (error) {
//         res.status(500).send("An error occurred while rendering the about page.");
//       }
//     });

//     app.get("/compose", function(req, res) {
//       try {
//         res.render("compose");
//       } catch (error) {
//         res.status(500).send("An error occurred while rendering the about page.");
//       }
//     });

//     app.post("/compose", function(req, res) {
//       try {
//         const post = new Post({ /// create a document to save post title and postdata
//           title: req.body.postTitle,
//           content: req.body.postBody
//         });

//         post.save(function(err) {
//           if (!err) {
//             res.redirect("/");
//           }
//         });
//       } catch (error) {
//         res.status(500).send("An error occurred while saving the post.");
//       }
//     });


// app.get("/posts/:postId", function(req, res) {
//   try {
//     const requestedPostId = req.params.postId;

//     Post.findOne({ _id: requestedPostId }, function(err, post) {
//       if (err) {
//         console.error(err);
//         res.status(500).send("An error occurred while retrieving the post.");
//         return;
//       }

//       if (!post) {
//         res.status(404).send("Post not found.");
//         return;
//       }

//       res.render("post", {
//         title: post.title,
//         content: post.content
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while retrieving the post.");
//   }
// });

// ///...


//     const port = 3000;
//     app.listen(port, function() {
//       console.log(`Server started on port ${port}`);
//     });
//   } catch (err) {
//     console.error('Error connecting to the MongoDB server:', err);
//   }
// }

// connect();

















const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


const homeStartingContent = "L";
const aboutContent = "tdui.";
const contactContent = "ro.";


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define the MongoDB URI and database name
const uri = 'mongodb://127.0.0.1:27017';
const databaseName = "blogDB";

async function connect() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri + '/' + databaseName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB server is started");

    // Define the Post schema
    const postSchema = {
      title: String,
      content: String,
    };

    // Create the Post model
    const Post = mongoose.model('Post', postSchema);

    // Define routes

    // Home route to retrieve and display posts
    app.get("/", async function (req, res) {
      try {
        const posts = await Post.find({});
        res.render("home", {
          startingContent: homeStartingContent,
          posts: posts,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving the posts.");
      }
    });


app.get("/about", function(req, res) {
  try {
    res.render("about", { aboutContent: aboutContent });
  } catch (error) {
    res.status(500).send("An error occurred while rendering the about page.");
  }
});

app.get("/contact", function(req, res) {
  try {
    res.render("contact", { contactContent: contactContent });
  } catch (error) {
    res.status(500).send("An error occurred while rendering the about page.");
  }
});




    app.get("/compose", function(req, res) {
      try {
        res.render("compose");
      } catch (error) {
        res.status(500).send("An error occurred while rendering the about page.");
      }
    });

    app.post("/compose", function(req, res) {
      try {
        const post = new Post({ /// create a document to save post title and postdata
          title: req.body.postTitle,
          content: req.body.postBody
        });

        post.save(function(err) {
          if (!err) {
            res.redirect("/");
          }
        });
      } catch (error) {
        res.status(500).send("An error occurred while saving the post.");
      }
    });

app.get("/posts/:postId", function(req, res) {
  try {
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function(err, post) {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while retrieving the post.");
        return;
      }

      if (!post) {
        res.status(404).send("Post not found.");
        return;
      }

      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the post.");
  }
});

    // Start the server
    const port = 3000;
    app.listen(port, function () {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to the MongoDB server:', err);
  }
}
connect();





