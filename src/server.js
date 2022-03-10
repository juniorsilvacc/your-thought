const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const flash = require("express-flash");
const routes = require("./routes/routes");

require("./database");

const app = express();

// Template engine
app.engine(
  "handlebars",
  exphbs.engine({ extname: ".hbs", defaultLayout: "main" })
);
app.set("view engine", "handlebars");

// Receber respostas do body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Session middleware
app.use(
  session({
    name: "session",
    secret: "cT8pk904ZjwbrMzb7Z0Fm1ol4xVOHFj3",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      express: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

// Flash messages
app.use(flash());

// Public path
app.use(express.static("public"));

// Set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// Rotas
app.use(routes);

app.listen(3333);
