const url = "https://api.github.com/users/";
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
    return `
        <div class="profile_box">
            <div class="top_section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="${profile.login}'s avatar">
                    </div>
                    <div class="self">
                        <h1>${profile.name || "No Name Provided"}</h1>
                        <h1>@${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary_btn">Check Profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio ? profile.bio : "No Bio Available"}</p>
            </div>
            <div class="status">
                <div class="status_item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status_item">
                    <h3>Following</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status_item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>
    `;
};

const fetchProfile = async () => {
    const username = searchInputEl.value.trim();

    if (!username) {
        alert("Please enter a GitHub username");
        return;
    }

    loadingEl.innerText = "Loading...";
    loadingEl.style.color = "black";
    profileContainerEl.innerHTML = "";

    try {
        const res = await fetch(`${url}${username}`);
        const data = await res.json();

        if (res.ok) {
            profileContainerEl.innerHTML = generateProfile(data);
            loadingEl.innerText = "";
        } else {
            loadingEl.innerText = data.message || "User not found";
            loadingEl.style.color = "red";
            profileContainerEl.innerHTML = "";
        }
    } catch (error) {
        loadingEl.innerText = "Network error";
        loadingEl.style.color = "red";
        profileContainerEl.innerHTML = "";
    }
};

searchBtnEl.addEventListener("click", fetchProfile);

searchInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchProfile();
    }
});
