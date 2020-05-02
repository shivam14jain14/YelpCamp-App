var express       =require("express"),
    app           =express(),
    bodyparser    =require("body-parser"),
	methodOverride=require("method-override"),
    mongoose      =require("mongoose"),
	Campground    =require("./models/campground"),
	passport      =require("passport"),
	LocalStrategy =require("passport-local"),
	User          =require("./models/user"),
	Comment       =require("./models/comment"),
	seedDB        =require("./seeds"),
	flash         =require("connect-flash")


/// WE CAN REDUCE SOME CODE BY WRITING EX- campgroundRoutes=require("/campgrounds","./routes/campgrounds);
// what it will do is that it will append "/campgrounds" in every route of campgrounds
var commentRoutes    =require("./routes/comments"),
	reviewRoutes     = require("./routes/reviews"),
	campgroundRoutes =require("./routes/campgrounds"),
	indexRoutes       =require("./routes/index")
///index here is for auth routes 




/*var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_review_system";
mongoose.connect(url);*/
//mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser:true});

mongoose.connect("mongodb+srv://shivam:shivam14@cluster0-9fk5n.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true});




mongoose.set("useFindAndModify", false);
mongoose.set('useUnifiedTopology', true);
app.use(bodyparser.urlencoded({extended:true}));
app.use(flash());
//telling express tu usee body parse
app.set("view engine","ejs");
app.use(express.static( "public"));
app.use(methodOverride("_method"));
//seedDB();///Seed the database


///--------------------------------------------------------------------------------------------------------------

///PASSPORT CONFIGURATION

app.use(require("express-session")({
		
	secret:"Muffy is the cutest",
	resave:false,
	saveUninitialized:false
		}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


///NOW TO PASS (currentUser:req.user) to every route we can directly use the function below
///IT ACTS AS A MIDDLE WARE FUNCTION WHICH WILL GET IMPLEMENTED AT EVERY ROUTE
app.use(function(req,res,next)
	   {
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

-///-------------------------------------------------------------------------------------------------------------//
	
	
	
	
/*
//OLD SEED DATA
------------------------------------------------------------------------------------------------------------------
///we set the campground schema in a separate file and we are assesing it through module.exports


var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description: String
});

var Campground=mongoose.model("Campground",campgroundSchema);*/

//// Schema Setup 
/*
----------------------------------------------------------------------------------------------------------------------
Campground.create({
	name:"Granite Hill",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg",
	description:"All season long, we offer a host of themed weekends and daily activities. Our regularly scheduled activities at Granite Hill include games, crafts, hayrides, dances, bonfire socials, nature walks and ghost walks, all under the supervision of a full-time Activities Director."
},function(err,campground)
		  {
	if(err)
		console.log(err);
	else 
		console.log("Newly created campground")
		console.log(campground);
});
*/

/*
var campgrounds=[
		{
			name: "shivam",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
		{
			name: "tapan",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
	{
			name: "raghav",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
	{
			name: "shivam",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
		{
			name: "tapan",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
	{
			name: "raghav",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
	{
			name: "shivam",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
		{
			name: "tapan",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		},
	{
			name: "raghav",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg"
		}
	];*/

app.listen(process.env.PORT||3000,process.env.IP,function()
		  {
	console.log("yelp camp has started ");
});
