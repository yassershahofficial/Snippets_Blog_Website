document.addEventListener("DOMContentLoaded", function () {
    
    document.body.addEventListener("click", function (event) {
        if (event.target.id === "cancelForm") {
            window.location.href = "/directories";
        }
    });
    
    document.getElementById("redirectToForm").addEventListener("click", function () {
        window.location.href = "/add-post";
    });

    document.getElementById("filterPopup").addEventListener("click", function() {
        document.getElementById("screenpop").classList.toggle("visible");
        document.getElementById("fpopup").classList.toggle("visible");
    });

    document.getElementById("screenpop").addEventListener("click", function(event) {
        if(event.target === this){
            document.getElementById("screenpop").classList.toggle("visible");
            document.getElementById("fpopup").classList.toggle("visible")
        }
    });

});
