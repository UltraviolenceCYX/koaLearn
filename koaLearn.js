const Koa = require("koa")
const app = new Koa()
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");

//track request
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//static list
const list = ["abc", "def", "bdc", "baa"]; 

router.get("/todo/list", async (ctx, next) => {
    let query = ctx.request.query.query //get param to search
    ctx.response.body = `[${list.filter(i => i.includes(query))}]`;
});

router.post("/todo/add", async (ctx, next) => {
    console.log(1);
    let item = ctx.request.body.item
    list.push(item)
    ctx.response.body = `${list}`
});

// add middleware:
app.use(bodyParser());  
app.use(router.routes());

app.listen(3000)