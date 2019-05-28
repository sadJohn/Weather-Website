const searchInput = document.querySelector("input");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");

document.querySelector("form").addEventListener("submit", async e => {
  e.preventDefault();
  p1.textContent = 'Loading...';
  p2.textContent = '';
  try {
    const address = searchInput.value;
    const response = await fetch(
      `/weather?address=${address}`
    );
    const data = await response.json();
    p1.textContent = data.location;
    p2.textContent = data.forecast;
  } catch (e) {
    p1.textContent = e;
  }
});
