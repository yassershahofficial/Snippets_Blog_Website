document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("singleUpdatePost").addEventListener("click", function(){
        console.log("Update btn is pressed")
        const postId = event.target.getAttribute("data-id");
        window.location.href = `/update-post?id=${postId}`
    });
    document.getElementById("singleDeletePost").addEventListener("click", function(){
        // console.log("Delete btn is pressed")
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
    })
})