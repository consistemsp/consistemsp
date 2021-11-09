var observer = new IntersectionObserver(function (entries) {
  // no intersection with screen
  if (entries[0].intersectionRatio === 0)
    document.querySelector("#nav-container").classList.add("nav-container-sticky");
  // fully intersects with screen
  else if (entries[0].intersectionRatio === 1)
    document.querySelector("#nav-container").classList.remove("nav-container-sticky");
}, { threshold: [0, 1] });

observer.observe(document.querySelector("#limit"));

async function sendForm(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  
  try {
    // test on https://httpbin.org/post
    const res = await fetch("https://submit-form.com/OWGLDv3x", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: value.name,
        email: value.email,
        message: value.message,
        verify_email: value.verify_email,
      }),
    });
    document.querySelector("#contact-form").style.display = "none";
    if (res.ok === true) {
      document.querySelector("#form-ok").style.display = "block";
    } else {
      document.querySelector("#form-error").style.display = "block";
    }
  } catch (err) {
    document.querySelector("#contact-form").style.display = "none";
    document.querySelector("#form-error").style.display = "block";
    console.log(err.message);
  }
}

function showForm() {
  document.querySelector("#form-ok").style.display = "none";
  document.querySelector("#form-error").style.display = "none";
  document.getElementsByName('message')[0].value = "";
  const form = document.querySelector("#contact-form");
  form.style.display = "block";
}