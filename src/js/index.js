/**
 * Created by rookie on 2017/8/20.
 * All copyright belongs to rookie.
 */
import "../css/index.css";
import b from "./b";

function buildDiv (){
    b();
}
if (process.env.NODE_ENV === "production"){
    console.log(123123);
}

buildDiv();

if (module.hot){
    const div = document.createElement("div");
    div.innerHTML = "123123123";
    document.body.appendChild(div);
    console.log("asdasdasd");
    module.hot.accept("./b.js", function () {
        const div = document.createElement("div");
        div.innerHTML = "123123123";
        document.body.appendChild(div);
        console.log("asdasdasd");
    });
}
