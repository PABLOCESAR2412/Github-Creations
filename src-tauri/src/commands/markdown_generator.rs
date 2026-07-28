use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MarkdownConfig {
    pub title: String,
    pub show_stats: bool,
    pub show_top_languages: bool,
    pub show_repo_cards: bool,
    pub theme: String,
}

#[tauri::command]
pub fn generate_readme_markdown(
    username: String,
    config: MarkdownConfig,
) -> String {
    let mut md = String::new();
    
    if !config.title.is_empty() {
        md.push_str(&format!("# {}\n\n", config.title));
    } else {
        md.push_str(&format!("# Hi there 👋, I'm {}\n\n", username));
    }

    if config.show_stats {
        md.push_str("### 📊 GitHub Stats\n\n");
        md.push_str(&format!(
            "[![{}'s GitHub Stats](https://github-readme-stats.vercel.app/api?username={}&show_icons=true&theme={})](https://github.com/anuraghazra/github-readme-stats)\n\n",
            username, username, config.theme
        ));
    }

    if config.show_top_languages {
        md.push_str("### 💻 Most Used Languages\n\n");
        md.push_str(&format!(
            "[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username={}&layout=compact&theme={})](https://github.com/anuraghazra/github-readme-stats)\n\n",
            username, config.theme
        ));
    }

    md
}
