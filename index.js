//RESTful APIs using CRUD operations
const express = require("express");
const path = require("path");
const mOver = require("method-override");
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

//parsing data for POST method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mOver("_method"));

let posts = [
    {
        id: uuidv4(),
        location: "Kyoto, Japan",
        img: "data:image/jpeg;base64,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",
        caption: "Look how cool is Kyoto"
    },
    {
        id: uuidv4(),
        location: "Santiago Bernabue, Madrid",
        img: "data:image/jpeg;base64,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",
        caption: "Esto es para vosotros...Siuuuu"
    },
    {
        id: uuidv4(),
        location: "Red giant spot, Jupiter",
        img: "data:image/jpeg;base64,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",
        caption: "How coool!"
    }
];
let user = {
    id: "_r_sharma07",
    username: "Roshan Sharma",
    bio: "Following the light that sets me free"
};

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts, user });
});
//to edit profile
app.get("/posts/prof", (req, res) => {
    res.render("editProf.ejs", { user });
});
app.patch("/posts", (req, res) => {
    let newUser = req.body;
    user = newUser;
    res.redirect("/posts");
});
//to edit posts
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let idvPost = posts.find((p) => id === p.id);
    res.render("editPost.ejs", { idvPost });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let idvPost = posts.find((p) => id === p.id);
    let newLoc = req.body.location;
    let newCap = req.body.caption;
    idvPost.location = newLoc;
    idvPost.caption = newCap;
    res.redirect("/posts");
});

//to add new post
app.get("/posts/new", (req, res) => {
    res.render("addPost.ejs");
});
app.post("/posts", (req, res) => {
    let { location, img, caption } = req.body;
    let id = uuidv4();
    posts.push({ id, location, img, caption });
    res.redirect("/posts");
});


//to delete post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.get("*", (req, res) => {
    res.send("Page does not exists");
});