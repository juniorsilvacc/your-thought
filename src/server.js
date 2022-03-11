const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const flash = require("express-flash");

const toughtsRoutes = require("./routes/toughts.routes");
const authRoutes = require("./routes/auth.routes");
const ToughtController = require("./controllers/ToughtController");

require("./database");

const app = express();

// Template engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

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
app.use(express.static("src/public"));

// Set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// Rotas
app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);
app.get("/", ToughtController.showToughts);

// Servidor
app.listen(3333);
