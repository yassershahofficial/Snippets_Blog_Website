document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("gotoIndex").addEventListener("click", function() {
        window.location.href = "/";
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

    //no error but cannot work sort yet, need to check the render.js file
    document.getElementById("sorterGet").addEventListener("click", function(){

        const select = document.getElementById("sorterOptions");
        const [sortBy, orderBy] = select.value.split(" ");
        const order = orderBy === "Asc" ? "asc" : "des";

        fetch(`/api/posts?sortBy=${sortBy}&order=${order}`,
            {
                method: "Get"
            })
            // try building for dynamic content
            // .then(response => {
            //     if (response.ok) {
            //         return response.json();
            //     } 
            //     else {
            //         return response.json().then(err => {
            //             throw new Error(err.message);
            //         });
    
            
            .then(() => {
                window.location.href = `/directories?sortBy=${sortBy}&order=${order}`
            })
            .catch(err => {
                console.error("Error:", err);
            });

    })
})