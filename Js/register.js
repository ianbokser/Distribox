const mensajeEroor = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3005/api/register", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.user.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value,
        })
    });
    
        if (!res.ok) return mensajeEroor.classList.toggle("escondido",false);
        const resJson = await res.json();
        if (resJson.redirect) {
            console.log("Usuario registrado correctamente");
            window.location.href = resJson.redirect;
        }  
});
