document.addEventListener("DOMContentLoaded", function () {
    
    document.body.addEventListener("click", function (event) {
        if (event.target.id === "cancelForm") {
            window.location.href = "/directories";
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
