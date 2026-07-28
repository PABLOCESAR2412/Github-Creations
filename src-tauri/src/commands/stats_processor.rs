use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use super::github_commands::RepositoryStats;

#[derive(Debug, Serialize, Deserialize)]
pub struct LanguageStat {
    pub name: String,
    pub count: i32,
    pub percentage: f32,
}

#[tauri::command]
pub fn process_languages(repos: Vec<RepositoryStats>) -> Vec<LanguageStat> {
    let mut counts: HashMap<String, i32> = HashMap::new();
    let mut total = 0;

    for repo in repos {
        if let Some(lang) = repo.language {
            if !lang.trim().is_empty() {
                *counts.entry(lang).or_insert(0) += 1;
                total += 1;
            }
        }
    }

    let mut result: Vec<LanguageStat> = counts
        .into_iter()
        .map(|(name, count)| {
            let percentage = if total > 0 {
                (count as f32 / total as f32) * 100.0
            } else {
                0.0
            };
            LanguageStat {
                name,
                count,
                percentage: (percentage * 10.0).round() / 10.0,
            }
        })
        .collect();

    result.sort_by(|a, b| b.count.cmp(&a.count));
    result
}

#[tauri::command]
pub fn calculate_totals(repos: Vec<RepositoryStats>) -> (i32, i32) {
    let mut stars = 0;
    let mut forks = 0;
    for repo in repos {
        stars += repo.stars;
        forks += repo.forks;
    }
    (stars, forks)
}
