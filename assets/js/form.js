// document.addEventListener("DOMContentLoaded", function () {
//     document.body.addEventListener("click", function (event){
//         if(event.target.id === "updateForm"){
//             console.log("Update form btn is pressed")
//             const postId = event.target.getAttribute("data-id");
//             // window.location.href = `/update-post?id=${postId}`
//             fetch(`/api/post/${postId}`,
//                 {
//                     method: "Put",
//                     body: JSON.stringify(Object.fromEntries(formData)),
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 .then(response => {
//                     if(response.ok){
//                         return response.json()
//                     }
//                     else{
//                         return response.json()
//                         .then(err =>{
//                             throw new Error(err.message)
//                         })
//                     }
//                 })
//                 .then(data =>{
//                     alert(data.message);
//                     window.location.href = "/directories"
//                 })
//         }
//     })
// });
document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event) {
        if (event.target.id === "updateForm") {
            console.log("Update form button is pressed");

            const postId = event.target.getAttribute("data-id");
            const form = document.getElementById("form");

            // Create FormData from the form
            const formData = new FormData(form);

            // Convert FormData to JSON
            const formObject = Object.fromEntries(formData.entries());

            fetch(`/api/post/${postId}`, {
                method: "PUT",
                body: JSON.stringify(formObject),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });
                }
            })
            .then(data => {
                alert(data.message);
                window.location.href = "/directories";
            })
            .catch(error => {
                console.error("Error:", error.message);
                alert(error.message);
            });
        }
    });
});
