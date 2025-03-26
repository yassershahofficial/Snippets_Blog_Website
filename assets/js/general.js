document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event){
        if (event.target.id === "cancelForm") {
            // window.location.href = "/directories";
            window.history.go(-1);
        }
    })
})