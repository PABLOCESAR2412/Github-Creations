use serde::{Deserialize, Serialize};
use reqwest::header::USER_AGENT;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitHubStats {
    pub login: String,
    pub name: Option<String>,
    pub bio: Option<String>,
    pub avatar_url: Option<String>,
    pub public_repos: i32,
    pub followers: i32,
    pub following: i32,
    pub public_gists: i32,
    pub created_at: String,
    pub company: Option<String>,
    pub location: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RepositoryStats {
    pub name: String,
    pub description: Option<String>,
    pub url: String,
    pub stars: i32,
    pub forks: i32,
    pub language: Option<String>,
    pub last_update: String,
    pub watchers: i32,
    pub open_issues: i32,
}

#[derive(Debug, Deserialize)]
struct RawGitHubUser {
    login: String,
    name: Option<String>,
    bio: Option<String>,
    avatar_url: Option<String>,
    public_repos: i32,
    followers: i32,
    following: i32,
    public_gists: i32,
    created_at: String,
    company: Option<String>,
    location: Option<String>,
}

#[derive(Debug, Deserialize)]
struct RawGitHubRepo {
    name: String,
    description: Option<String>,
    html_url: String,
    stargazers_count: i32,
    forks_count: i32,
    language: Option<String>,
    updated_at: String,
    watchers_count: i32,
    open_issues_count: i32,
}

fn create_client(token: Option<&str>) -> reqwest::Client {
    let mut builder = reqwest::Client::builder();
    builder.build().unwrap_or_else(|_| reqwest::Client::new())
}

#[tauri::command]
pub async fn fetch_user_stats(username: String, token: Option<String>) -> Result<GitHubStats, String> {
    let client = create_client(token.as_deref());
    let url = format!("https://api.github.com/users/{}", username);
    
    let mut req = client.get(&url).header(USER_AGENT, "github-stats-generator");
    if let Some(t) = token.filter(|s| !s.trim().is_empty()) {
        req = req.header("Authorization", format!("Bearer {}", t));
    }

    let res = req.send().await.map_err(|e| e.to_string())?;
    
    if !res.status().is_success() {
        return Err(format!("GitHub API error: HTTP {}", res.status()));
    }

    let user: RawGitHubUser = res.json().await.map_err(|e| e.to_string())?;

    Ok(GitHubStats {
        login: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        public_gists: user.public_gists,
        created_at: user.created_at,
        company: user.company,
        location: user.location,
    })
}

#[tauri::command]
pub async fn fetch_user_repos(username: String, token: Option<String>) -> Result<Vec<RepositoryStats>, String> {
    let client = create_client(token.as_deref());
    let url = format!("https://api.github.com/users/{}/repos?sort=updated&per_page=100", username);
    
    let mut req = client.get(&url).header(USER_AGENT, "github-stats-generator");
    if let Some(t) = token.filter(|s| !s.trim().is_empty()) {
        req = req.header("Authorization", format!("Bearer {}", t));
    }

    let res = req.send().await.map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Err(format!("GitHub API error: HTTP {}", res.status()));
    }

    let repos: Vec<RawGitHubRepo> = res.json().await.map_err(|e| e.to_string())?;

    let result = repos
        .into_iter()
        .map(|r| RepositoryStats {
            name: r.name,
            description: r.description,
            url: r.html_url,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            last_update: r.updated_at,
            watchers: r.watchers_count,
            open_issues: r.open_issues_count,
        })
        .collect();

    Ok(result)
}

#[tauri::command]
pub async fn fetch_repo_stats(owner: String, repo: String, token: Option<String>) -> Result<RepositoryStats, String> {
    let client = create_client(token.as_deref());
    let url = format!("https://api.github.com/repos/{}/{}", owner, repo);
    
    let mut req = client.get(&url).header(USER_AGENT, "github-stats-generator");
    if let Some(t) = token.filter(|s| !s.trim().is_empty()) {
        req = req.header("Authorization", format!("Bearer {}", t));
    }

    let res = req.send().await.map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Err(format!("GitHub API error: HTTP {}", res.status()));
    }

    let r: RawGitHubRepo = res.json().await.map_err(|e| e.to_string())?;

    Ok(RepositoryStats {
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        last_update: r.updated_at,
        watchers: r.watchers_count,
        open_issues: r.open_issues_count,
    })
}
