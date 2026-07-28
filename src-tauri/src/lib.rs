mod commands;

use commands::github_commands::{fetch_user_stats, fetch_user_repos, fetch_repo_stats};
use commands::stats_processor::{process_languages, calculate_totals};
use commands::markdown_generator::generate_readme_markdown;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            fetch_user_stats,
            fetch_user_repos,
            fetch_repo_stats,
            process_languages,
            calculate_totals,
            generate_readme_markdown
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
