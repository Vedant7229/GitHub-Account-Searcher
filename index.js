const url = "https://api.github.com/users/";
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

// Function to generate the user profile HTML
const generateProfile = (profile) => {
    return `
        <div class="profile_box">
            <div class="top_section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="Avatar">
                    </div>
                    <div class="self">
                        <h1>${profile.name || "No Name Provided"}</h1> <!-- CHANGE: Added fallback value -->
                        <h1>${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank"> <!-- CHANGE: Fixed typo from herf to href -->
                    <button class="primary_btn">Check Profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio || "No Bio Available"}</p> <!-- CHANGE: Added fallback value -->
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

// Function to fetch the GitHub profile data
const fetchProfile = async () => {
    const username = searchInputEl.value.trim(); // CHANGE: Added `.trim()` to prevent empty/whitespace input

    if (!username) { // CHANGE: Added validation to check if input is empty
        alert("Please enter a GitHub username");
        return;
    }

    loadingEl.innerText = "Loading..."; // CHANGE: Ensured loading message displays
    loadingEl.style.color = "black";

    try {
        const res = await fetch(`${url}${username}`);
        if (!res.ok) { // CHANGE: Added error handling for invalid usernames
            throw new Error("User not found");
        }

        const data = await res.json();

        profileContainerEl.innerHTML = generateProfile(data); // CHANGE: Dynamically update the profile container
        loadingEl.innerText = ""; // CHANGE: Clear the loading message on success
    } catch (error) {
        loadingEl.innerText = error.message; // CHANGE: Display error message
        loadingEl.style.color = "red";
        profileContainerEl.innerHTML = ""; // CHANGE: Clear profile container on error
    }
};

// Event listener for the search button
searchBtnEl.addEventListener("click", fetchProfile); // CHANGE: Ensure the event listener works
