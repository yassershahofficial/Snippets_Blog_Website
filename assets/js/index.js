document.addEventListener("DOMContentLoaded", function () {
    
    document.body.addEventListener("click", function (event) {
        if (event.target.id === "cancelForm") {
            // window.location.href = "/directories";
            window.history.go(-1);
        }
        else if(event.target.id === "singleDeletePost"){
            const postId = event.target.getAttribute("data-id");

            if(confirm("Are you sure you want to delete this post? This action cannot be Undone")){
                fetch(`/api/posts/${postId}`, 
                    {
                        method : "Delete"
                    })
                    //this one responsible to check status code in backend
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }
                        else{
                            return response.json()
                                .then(err =>{
                                    throw new Error(err.message)
                                })
                        }
                    })
                    //this one responsible to show the sent message in backend
                    .then(data =>{
                        alert(data.message);
                        window.location.href = "/directories"
                    })
                    .catch(err =>{
                        alert("Error : " + err.message)
                    })
            }
        }
        else if(event.target.id === "singleUpdatePost"){
            const postId = event.target.getAttribute("data-id");
            window.location.href = `/update-post?id=${postId}`
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
            //     }
            // })
            .then(() => {
                window.location.href = `/directories?sortBy=${sortBy}&order=${order}`
            })
            .catch(err => {
                console.error("Error:", err);
            });

    })

});
